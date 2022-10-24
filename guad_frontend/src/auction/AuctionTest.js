import axios from "axios";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null
function AuctionTest({match}) {
    const [bid, setBid] = useState();
    const [bidList, setBidList] = useState([]);
    const [change, setChange] = useState(false);
    const [Dto, setDto] = useState({
        itemNum: match.params.itemNum,
        auctionMaxPrice: 0,
        nickname: '홍길동',
        email: '123@123',
    });
    useEffect(() => {
        connect();
    }, [bidList])

    useEffect(() => {
        axios.get("http://192.168.0.35:8080/bidlist?itemNum="+Dto.itemNum)
        .then(response => {
            console.log(response.data)
            const newBidList = [...response.data]
            setBidList(newBidList)
        })
        .catch(error => console.log(error))
        // connect();
    }, [change])

    const connect = () => {
        let Sock = new SockJS('http://192.168.0.35:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(Dto.itemNum)
        stompClient.subscribe(`/sub/${Dto.itemNum}/bidlist`, onMessageReceived);
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setChange(!change);
    }

    const handlerBid = () => {
        stompClient.send(`/pub/bidlist/${Dto.itemNum}`, {}, JSON.stringify(Dto));
        // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    const handlerBidPrice = e => {
        setBid(e.target.value)
        setDto({ ...Dto, "auctionMaxPrice": e.target.value })
    }

    return (
        <>
            <h2>입찰 리스트</h2>
            {bidList.map((bid, index) => (
                <p key={index}>{bid}</p>
            ))
            ||
            "입찰 기록이 없습니다."
            }
            <br></br>
            <input type="number" value={bid} onChange={handlerBidPrice}
                style={{ border: "1px solid" }}
            ></input>
            <button onClick={handlerBid}>입찰</button>
        </>
    )
}

export default AuctionTest;