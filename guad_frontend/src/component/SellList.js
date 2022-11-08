import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";
import SellListPaging from "./SellListPaging";

function Sell_List() {
  const [data, setData] = useState([]); // 상품 전체 정보
  const [category, setCategory] = useState([]); // 카테고리 전체정보
  const [itemTypeList, setItemTypeList] = useState([]); // 대분류
  const [itemDTypeList, setItemDTypeList] = useState([]); // 소분류
  const [selectedOptions, setSelectedOptions] = useState({ // 선택된 분류
    sellType: "",
    itemType: "",
    itemDType: '',
    search: '',
  });
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템

  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(12); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(12);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [cateOn, setCateOn] = useState(false);
  const c_m = useRef();
  const c_o = useRef();

  console.log("-------------------------------")
  console.log(selectedOptions)
  console.log(items)
  console.log(currentPosts)

  const OnItemType = (value, name) => {
    console.log("함수ㅡㅡㅡㅡㅡㅡㅡㅡ")
    console.log(value, ", " + name)
    console.log(selectedOptions)
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
    if (name === "sellType") {
      if (value === "") {

        setSelectedOptions({ ...selectedOptions, sellType: "" });

        if (selectedOptions.itemType === "") {
          console.log(1)
          setItems(data);
        } else if (selectedOptions.itemType !== "" && selectedOptions.itemDType === "") {
          console.log(2)
          setItems(data.filter((item) => item.itemType === selectedOptions.itemType));
          console.log(3)
        } else if (selectedOptions.itemType !== "" && selectedOptions.itemDType !== "") {
          console.log(4)
          setItems(data.filter((item) => item.itemDType === selectedOptions.itemDType));
        }
      } else if (value !== "") {

        setSelectedOptions({ ...selectedOptions, sellType: value });

        if (selectedOptions.itemType === "") {
          console.log(5)
          setItems(data.filter((item) => item.sellType === value));
        } else if (selectedOptions.itemType !== "" && selectedOptions.itemDType === "") {
          console.log(6)
          setItems(
            data.filter(
              (item) =>
                item.itemType === selectedOptions.itemType &&
                item.sellType === value
            )
          );
        } else if (selectedOptions.itemType !== "" && selectedOptions.itemDType !== "") {
          console.log(7)
          setItems(
            data.filter(
              (item) =>
                item.itemDType === selectedOptions.itemDType &&
                item.sellType === value
            )
          );
        }
      }
    } else if (name === "itemType") {
      if (value === "") {
        setSelectedOptions({ ...selectedOptions, itemType: "", itemDType: "" });
        setSelectedOptions({ ...selectedOptions, sellType: "" });
        c_o.current.style = "display:none;";
        if (selectedOptions.sellType === "") {
          console.log(8)
          setItems(data);
        } else if (selectedOptions.sellType !== "") {
          console.log(9)
          setItems(data.filter((item) => item.sellType === selectedOptions.sellType));
        }
      } else {
        const newItemDT = [];
        category.forEach((element, index) => {
          if (element.itemType === value && element.itemDType !== "") {
            newItemDT.push(element.itemDType);
          }
        });
        setSelectedOptions({ ...selectedOptions, sellType: "" });
        setItemDTypeList(newItemDT);
        setSelectedOptions({ ...selectedOptions, itemType: value, itemDType: '' });
        c_o.current.style = "display:inline-block;";

        if (selectedOptions.sellType === "") {
          console.log(10)
          setItems(data.filter((item) => item.itemType === value));
        } else if (selectedOptions.sellType !== "") {
          console.log(11)
          setItems(
            data.filter(
              (item) =>
                item.itemType === value &&
                item.sellType === selectedOptions.sellType
            )
          );
        }
      }
    } else if (name === "itemDetailType") {
      setSelectedOptions({ ...selectedOptions, itemDType: value, sellType: "" })
      c_m.current.style = "display:none;";
      c_o.current.style = "display:none;";
      setCateOn(false);

      if (selectedOptions.sellType === "") {
        console.log(12)
        setItems(data.filter((item) => item.itemDType === value))
      } else if (selectedOptions.sellType !== "") {
        console.log(13)
        setItems(
          data.filter(
            (item) =>
              item.itemDType === value &&
              item.sellType === selectedOptions.sellType
          )
        );
      }
    } else {
      alert("에러")
    }


    // setIndexOfLastPost(currentpage * postPerPage);
    // setIndexOfFirstPost(indexOfLastPost - postPerPage);
    // setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }
  useEffect(() => {
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [selectedOptions])


  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category`)
      .then((response) => {
        const temp1 = [];
        console.log(response.data)
        response.data.forEach((element) => temp1.push(element.itemType));
        const temp2 = temp1.filter(
          (element, index) => temp1.indexOf(element) === index
        );
        console.log(temp2)
        setItemTypeList(temp2)
        setCategory(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem`)
      .then((response) => {
        console.log(response.data)
        setData(response.data);
        setItems(response.data);
        setCurrentPosts(response.data?.slice(indexOfFirstPost, indexOfLastPost));
      })
      .catch((error) => console.log(error));

  }, [])

  // const handlerSetPage = (e) => {
  //   setCurrentpage(e);
  // };

  const OnCategory = (e) => {
    if (cateOn === false) {
      setCateOn(true);
      c_m.current.style = "display:inline-block;";
    } else {
      setCateOn(false);
      c_m.current.style = "display:none;";
      c_o.current.style = "display:none;";
    }
  };

  const OffCategory = () => {
    setCateOn(false);
    c_m.current.style = "display:none;";
    c_o.current.style = "display:none;";
  };

  const ResetType = () => {
    setSelectedOptions({ ...selectedOptions, itemType: "", itemDType: "" });
    // setItemType("");
    c_o.current.style = "display:none;";
  };

  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품
            {items.length == 0 && <strong>0</strong>}
            {items.length != 0 && <strong>{items.length}</strong>}개
          </h2>
          <p onClick={OnCategory} className={style.cate_btn}>
            {selectedOptions.itemType == "" ? <>카테고리 보기</> : <>{selectedOptions.itemType}</>}
          </p>
          <div className={style.cate_box}>
            <div className={style.cate_main} ref={c_m}>
              <span className={style.close} onClick={OffCategory}>
                &times;
              </span>
              <p onClick={ResetType} className={style.reset}>
                전체 카테고리
              </p>
              <ul>
                {itemTypeList &&
                  itemTypeList.map((type, index) => {
                    return (
                      <li key={index} onClick={() => OnItemType(type, "itemType")}>
                        <a>{type}</a>
                      </li>)
                  })}
              </ul>
            </div>
            <div className={style.cate_option} ref={c_o}>
              <p>{selectedOptions.itemType}</p>
              <ul>
                {itemDTypeList &&
                  itemDTypeList.map((DType, index) => (
                    <li value={DType} key={index} onClick={() => OnItemType(DType, "itemDetailType")}>
                      <a>{DType}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <ul>
            <li>
              <button
                type="button"
                name="all"
                // onClick={checkSellType}
                onClick={() => OnItemType("", "sellType")}
                className={
                  selectedOptions.sellType === ""
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                전 품목
              </button>
            </li>
            <li>
              <button
                type="button"
                name="up"
                // onClick={checkSellType}
                onClick={() => OnItemType("u", "sellType")}
                className={
                  selectedOptions.sellType === "u"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                오름경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="down"
                // onClick={checkSellType}
                onClick={() => OnItemType("d", "sellType")}
                className={
                  selectedOptions.sellType === "d"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                내림경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="normal"
                // onClick={checkSellType}
                onClick={() => OnItemType("n", "sellType")}
                className={
                  selectedOptions.sellType === "n"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                일반판매
              </button>
            </li>
          </ul>
        </div>
        <div className={style.sell_bot}>
          <ul>
            {data === 0 && <span>게시물이 없습니다.</span>}
            {data.length !== 0 && currentPosts.length !== 0 &&
              currentPosts.map((item, index) => (
                <SellListItem item={item} key={index} />
              ))}
          </ul>
          <span className={style.count_p}>
            {/* <ul>
              <SellListPaging
                page={currentpage}
                count={count}
                handlerSetPage={handlerSetPage}
              />
            </ul> */}
          </span>
        </div>
      </div>
    </>
  );
}
export default Sell_List;
