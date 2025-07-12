import React, { useEffect, useState } from 'react'
import people from '../assets/people.svg'
import check from '../assets/check.svg'
import ai from '../assets/monitor.svg'
import Hrform from '../Components/hrform'
import AiRoute from '../Components/AiRoute'
import axios from 'axios'

const classes = {
    container0: "bg-[#F0F3F8] mt-0",
    head1 : "text-4xl font-bold text-left",
    container1 : "flex flex-col w-[85%] mx-auto pt-10",
    container2 : "flex flex-row gap-6 mt-8 mb-[20px]",
    container3 : "flex my-10",
    card2 : "bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 w-full",
    intro1 : "text-md font-medium text-black/60 text-left mt-2",
    card1: "bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 w-full h-[350px]",
    head2: "text-xl font-bold text-center",
    head3: "text-xl font-bold text-left",
    ppl: "w-[65px] h-[65px] rounded-full bg-[#5252dd]/20 shadow-md p-2",
    imgcont: "flex flex-col justify-center items-center",
    ai: "w-[65px] h-[65px] rounded-full bg-[#CEF9E3] shadow-md p-2",
    img: "w-[45px] h-[45px] mx-auto mt-[4px]",
    intro2: "text-center font-medium text-black/60",
    intro3: "text-black/50 text-md font-medium",
    check: "w-[15px] h-[15px] mr-2 mt-[2px]",
    checkcont: "flex flex-row items-center",
    point: "mt-2 flex flex-col gap-2",
    button1: "bg-[#5252dd] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#5252dd]/80 hover:cursor-pointer",
    button2: "bg-[#0EB982] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#0EB982]/80 hover:cursor-pointer",
    img1: "w-[20px] h-[20px] mt-[2px]",
    img2: "w-[17px] h-[17px] mt-[3px]",
    tbhead: "text-left text-black/60 font-bold text-sm p-2",
    thead: "bg-[#F0F3F8] text-black/80 mb-[10px]",
    table: 'table-fixed w-full',
    trow: 'py-[12px] px-[10px] text-sm font-semibold',
}

const Mock = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('userToken');
        if (!token) return;
        const response = await axios.get('${API_BASE_URL}/api/mock-interview/user-history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setInterviews(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch interviews');
        }
      } catch (err) {
        setError('Failed to fetch interviews');
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  return (
    <div className={classes.container0}>
      <div className={classes.container1}>
        <div>
          <div id='head' className={classes.head1}>Mock Interview</div>
          <div className={classes.intro1}>Practice your interview skills with HR professionals or our AI interviewer</div>
          <div id='head' className={classes.container2}>
            <div className={classes.card1}>
              <div className={classes.imgcont}><img src={people} className={classes.ppl}></img></div>
              <div className={classes.head2}>HR Live Interview</div>
              <div className={classes.intro2}>Connect with real HR professionals</div>
              <div className={classes.point}>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Real-time feedback</span></div>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Industry-specific questions</span></div>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Personalized advice</span></div>
              </div>
              <div><Hrform/></div>
            </div>
            <div className={classes.card1}>
              <div className={classes.imgcont}><div className={classes.ai}><img src={ai} className={classes.img}></img></div></div>
              <div className={classes.head2}>AI Interview</div>
              <div className={classes.intro2}>Practice anytime with our AI Interviewer</div>
              <div className={classes.point}>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Available 24/7</span></div>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Instant feedback</span></div>
                <div className={classes.checkcont}><img src={check} className={classes.check}></img><span className={classes.intro3}>Multiple interview types</span></div>
              </div>
              <div><AiRoute/></div>
            </div>
          </div>
          <div id='table' className={classes.container3}>
            <div className={classes.card2}>
              <div className={classes.head3}>Recent Interviews</div>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <table className={classes.table}>
                  <thead className={classes.thead}>
                    <tr>
                      <th className={classes.tbhead}>DATE</th>
                      <th className={classes.tbhead}>POSITION</th>
                      <th className={classes.tbhead}>SCORE (Overall)</th>
                      <th className={classes.tbhead}>FEEDBACK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((item, index) => (
                      <tr key={index}>
                        <td className={classes.trow}>{item.date ? new Date(item.date).toLocaleDateString() : '-'}</td>
                        <td className={classes.trow}>{item.position}</td>
                        <td className={classes.trow}>{item.scores && typeof item.scores.overall === 'number' ? item.scores.overall : '-'}</td>
                        <td className={classes.trow}>{item.feedback || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mock;