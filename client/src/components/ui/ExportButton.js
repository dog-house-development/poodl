import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const propTypes = {
    data: PropTypes.array.isRequired,
    fileName: PropTypes.string,
    format: PropTypes.oneOf(['csv'])
};

const defaultProps = {
    fileName: 'export',
    format: 'csv'
};

class ExportButton extends Component {
    exportToCsv = () => {
        var processRow = function(row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
                if (j > 0) finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < this.props.data.length; i++) {
            csvFile += processRow(this.props.data[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, this.props.fileName);
        } else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', this.props.fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    exportData = () => {
        const formats = {
            csv: this.exportToCsv
        };
        formats[this.props.format]();
        // check what the format is and call the correct function
    };

    render() {
        const { data, children, fileName, format, ...props } = this.props;
        return (
            <Button onClick={this.exportData} icon="cloud_download" {...props}>
                {children}
            </Button>
        );
    }
}

ExportButton.propTypes = propTypes;
ExportButton.defaultProps = defaultProps;
export default ExportButton;
