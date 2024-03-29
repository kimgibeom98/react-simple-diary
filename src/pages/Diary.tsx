import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";

import { getStringDate } from "../util/date";

import { DataInfo } from '../interfaces/Userinterface'

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext) as DataInfo[];
  const navigate = useNavigate();
  const [data, setData] = useState<DataInfo>();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.textContent = `Simple Diary - ${id}번 일기`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id.toString() === id);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>
  } else {
    return (
      <>
        <CustomHeader headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<CustomButton onClick={() => navigate(-1)}>{'뒤로가기'}</CustomButton>}
          rightChild={<CustomButton onClick={() => navigate(`/edit/${data.id}`)}>{'수정하기'}</CustomButton>} />
        <section className="DiaryPage">
          <p className="diary_title_wrapper">{data.title}</p>
          <p className="diary_date_wrapper">{getStringDate(new Date(data.date))}</p>
          <p className="diary_content_wrapper">{data.content}</p>
        </section>
      </>
    )
  }
};

export default Diary;