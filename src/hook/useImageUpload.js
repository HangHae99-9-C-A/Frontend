import { useState } from "react";

//이미지 압축
import imageCompression from "browser-image-compression";

const useImageUpload = (
  limitCount = 0,
  isComp = false,
  imgMaxSize = 1,
  imgMaxWidthHeight = 1920,
  reset = true
) => {
  //이미지 파일 & 프리뷰URL useState
  const [imgFiles, setImgFiles] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);

  //이미지 가져오기 핸들러
  const handler = (e) => {
    //파일 가져오기
    const files = e.currentTarget.files;

    //state 초기화
    if (reset === true) {
      setImgFiles([]);
      setImgUrls([]);
    }
    //파일 갯수 제한
    if (limitCount > 0) {
      if ([...files].length > limitCount) {
        alert(`이미지는 최대 ${limitCount}개까지 업로드가 가능합니다.`);
        return;
      }
    }

    //선택한 이미지 파일 반복문 돌리기
    [...files].forEach((file) => {
      //이미지 파일만 올릴수 있게 체크
      if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드가 가능합니다.");
        return;
      }

      //압축 옵션
      const options = {
        maxSizeMB: imgMaxSize,
        maxWidthOrHeight: imgMaxWidthHeight,
        useWebWorker: true,
      };

      if (isComp) {
        //이미지 압축
        imageCompression(file, options)
          .then((res) => {
            //압축 이미지 파일 담기
            //blob to file blob을 file로 형변환
            setImgFiles((imgs) => [
              ...imgs,
              new File([res], res.name, {
                type: "image/" + res.name.split(".")[1],
              }),
            ]);

            //압축 이미지 url 담기
            const reader = new FileReader(); // FileReader API로 이미지 인식
            reader.onload = () => {
              // 사진 올리고 나서 처리하는 event
              setImgUrls((imgUrls) => [
                ...imgUrls,
                { name: res.name, url: reader.result },
              ]);
            };
            reader.readAsDataURL(res); //reader에게 file을 먼저 읽힘
          })
          .catch((error) => {});
      } else {
        //이미지 파일 담기
        setImgFiles((imgs) => [...imgs, file]);
        //압축 이미지 url 담기
        const reader = new FileReader(); // FileReader API로 이미지 인식
        reader.onload = () => {
          // 사진 올리고 나서 처리하는 event
          setImgUrls((imgUrls) => [...imgUrls, { url: reader.result }]);
        };
        reader.readAsDataURL(file); //reader에게 file을 먼저 읽힘
      }
    });
  };

  //이미지 삭제
  const deleteHandler = (e) => {
    setImgFiles(imgFiles.filter((item) => item.name !== e.name));
    setImgUrls(imgUrls.filter((url) => url.url !== e.url));
  };

  return [imgFiles, imgUrls, handler, deleteHandler];
};

export default useImageUpload;
