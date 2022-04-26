import React from 'react';
import ExportJsonExcel from "js-export-excel";
import { Button, message } from "antd";
import moment from "moment";
interface columnsItem{
    dataIndex: string,
    title: string,
    width?: number,
}

interface ExportExcelProps{
    columns: columnsItem[],
    dataSource: any[],
    fileName?: string,
    btnLabel?: string
}

function ExportExcel({
    columns = [],
    dataSource = [],
    fileName = "表格下载",
    btnLabel = "导出",
    ...props
}: ExportExcelProps) {

    const getOptions = () => {
        return {
            fileName: `${fileName}_${moment().format('YYYY-DD-MM hh:mm:ss')}`,
            datas: [
                {
                    sheetData: [...dataSource], // 导出数据
                    sheetName: "sheet", // sheet名称
                    sheetFilter: columns.map(item => item.dataIndex), // 列对应的 数据标识 key  根据key 展示列value
                    sheetHeader: columns.map(item => item.title), // 表头对应内容
                    columnWidths: columns.map(item => item.width || 10), // 设置各列宽
                }
            ]
        }
    }

    const download = () => {
        if (dataSource.length === 0) {
            message.warn('暂无数据');
            return
        }

        const options = getOptions();
        const toExcel = new ExportJsonExcel(options);
        toExcel.saveExcel()
    }


    return (
        <Button type="primary" onClick={download} {...props}>{ btnLabel }</Button>
    );
}

export default ExportExcel;