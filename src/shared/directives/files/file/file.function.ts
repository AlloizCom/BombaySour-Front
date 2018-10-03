export const MAX_UPLOAD_SIZE = 1000000000000000000000000000000000000000000000000000000000000;
export const BYTE_IN_MB = 1000000;


export function FILE_BASE64(file: File, funcOnReadyReader, progress, ended) {
  if (file.size < MAX_UPLOAD_SIZE) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      funcOnReadyReader(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.onprogress = function (data) {
      progress(data);
    };
    reader.onloadend = function (data) {
      ended(data);
    };
  } else {
    alert('out max size file:[' + file.name + ']max size is:[' + (MAX_UPLOAD_SIZE / BYTE_IN_MB).toFixed(2) + 'mb]file size is:[' + (file.size / BYTE_IN_MB).toFixed(2) + 'mb]');
  }
}

export function FILES_BASE64(file: File[], funcOnReadyReader, progress, ended, start) {
  let reader = new FileReader();
  let i = 0;
  if (file[i].size < MAX_UPLOAD_SIZE) {
    reader.readAsDataURL(file[i]);
    reader.onload = () => {
      funcOnReadyReader(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.onprogress = function (data) {
      progress(data);
    };
    reader.onloadend = function (data) {
      if (file.length - 1 == i)
        ended(data);
      else
        FILES_BASE64_I(file, funcOnReadyReader, progress, ended, start, i + 1);

    };
    reader.onloadstart = function (data) {
      start(data);
    };
  } else {
    alert('out max size file:[' + file[i].name + ']max size is:[' + (MAX_UPLOAD_SIZE / BYTE_IN_MB).toFixed(2) + 'mb]file size is:[' + (file[i].size / BYTE_IN_MB).toFixed(2) + 'mb]');
    if (file.length - 1 == i)
      ended(null);
    else
      FILES_BASE64_I(file, funcOnReadyReader, progress, ended, start, i + 1);
  }
}

export function FILES_BASE64_I(file: File[], funcOnReadyReader, progress, ended, start, i) {
  let reader = new FileReader();
  if (file[i].size < MAX_UPLOAD_SIZE) {
    reader.readAsDataURL(file[i]);
    reader.onload = () => {
      funcOnReadyReader(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.onprogress = function (data) {
      progress(data);
    };
    reader.onloadend = function (data) {
      if (file.length - 1 == i)
        ended(data);
      else
        FILES_BASE64_I(file, funcOnReadyReader, progress, ended, start, i + 1);
    };
    reader.onloadstart = function (data) {
      start(data);
    };
  } else {
    alert('out max size file:[' + file[i].name + ']max size is:[' + (MAX_UPLOAD_SIZE / BYTE_IN_MB).toFixed(2) + 'mb]file size is:[' + (file[i].size / BYTE_IN_MB).toFixed(2) + 'mb]');
    if (file.length - 1 == i)
      ended(null);
    else
      FILES_BASE64_I(file, funcOnReadyReader, progress, ended, start, i + 1);
  }
}
