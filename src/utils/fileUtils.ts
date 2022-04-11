// 转base64的方法，公共类方法

export function getBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (!e.target?.result) {
        reject(e);
        return;
      }
      resolve(e.target.result as string);
    };

    fileReader.readAsDataURL(blob);
    fileReader.onerror = (e) => {
      reject(e);
    };
  });
}
