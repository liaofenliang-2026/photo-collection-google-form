/***** 配置区：按实际修改 *****/
// 上传照片所在的 Drive 文件夹 ID（在 Drive 打开该文件夹，URL 中 /folders/ 后那一串）
const UPLOAD_FORM_FOLDER_ID = '1AaQo2p08JhggE2Kf7Qmlme4gH1TgonN2pL2G8v4_oCsn4Di6gHcjyxqphKPaqmyxTTVeR2Lk';
// 响应 Sheet 中要保留的表头行数（通常是 1）
const CLEAR_SHEET_HEADERS_ROWS = 1;


/***** 手动执行主函数 *****/
function cleanUploadFormAndFiles() {
  // 1. 清空上传表单所有回复
  const form = FormApp.getActiveForm();
  form.deleteAllResponses();  // 等同于界面“删除所有回复”[web:174]

  // 2. 清空当前连接的响应 Sheet（保留表头行）
  const destId = form.getDestinationId();  // 当前表单连接的响应表ID[web:140]
  if (destId) {
    const ss = SpreadsheetApp.openById(destId);
    const sheet = ss.getSheets()[0];       // 一般是 “Form Responses 1”
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow > CLEAR_SHEET_HEADERS_ROWS) {
      const numRows = lastRow - CLEAR_SHEET_HEADERS_ROWS;
      sheet.getRange(CLEAR_SHEET_HEADERS_ROWS + 1, 1, numRows, lastCol).clearContent();
    }
  }

  // 3. 删除上传文件夹里的所有文件（移入回收站）
  if (UPLOAD_FORM_FOLDER_ID) {
    const folder = DriveApp.getFolderById(UPLOAD_FORM_FOLDER_ID);
    const files = folder.getFiles();
    let count = 0;
    while (files.hasNext()) {
      const file = files.next();
      file.setTrashed(true);   // 移到回收站，不是永久删除[web:169]
      count++;
    }
    Logger.log(`已将上传文件夹中的 ${count} 个文件移至回收站`);
  } else {
    Logger.log('⚠️ 未设置 UPLOAD_FORM_FOLDER_ID，跳过删除照片步骤');
  }

  Logger.log('✅ 已手动清空：表单回复 + 响应表内容 + 上传文件夹图片');
}
