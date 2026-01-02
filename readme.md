# Google Form Cleaner

用 Google Apps Script 一键清空一个上传照片用 Google 表单的：
- 所有表单回复  
- 响应表（保留表头行）  
- 绑定的 Drive 上传文件夹中的文件（移到回收站）

## 使用场景

每周或每个活动结束后，需要重置同一个 Google 表单给新一批用户使用：
- 表单结构不变，只需要清掉旧回复和旧照片
- 避免手动在界面里反复点击删除

## 配置方法

1. 在脚本顶部修改：

```javascript
const UPLOAD_FORM_FOLDER_ID = '...';   // 上传文件所在 Drive 文件夹 ID
const CLEAR_SHEET_HEADERS_ROWS = 1;    // 响应表要保留的表头行数
