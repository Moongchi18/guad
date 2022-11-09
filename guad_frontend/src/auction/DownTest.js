import axios from "axios";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null
const token = `Bearer ${sessionStorage.getItem("token")}`
function AuctionTest({match}) {
    // const [bid, setBid] = useState();
    const [auctionCurrentPrice, setAuctionCurrentPrice] = useState();
    const [sendDto, setSendDto] = useState({
        itemNum: match.params.itemNum,
        sold: ''
    });
    useEffect(() => {
        connect();
    }, [auctionCurrentPrice])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/bidlist`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
        // connect();
    }, [])

    const connect = () => {
        let Sock = new SockJS(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(match.params.itemNum)
        // 구독url
        stompClient.subscribe(`/sub/${match.params.itemNum}/bidlist`, onMessageReceived);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        // setAuctionCurrentPrice(payloadData)
    }

    const handlerBid = () => {
        // 서버에 데이터를 보낼 때
        stompClient.send(`/pub/bidlist/${match.params.itemNum}`, {Authorization: token}, JSON.stringify(sendDto));
    }
    return (
        <>
            {/* <h2>입찰</h2>
            {presentBid}
            <br></br>
            <input type="number" value={bid} onChange={handlerBidPrice}
                style={{ border: "1px solid" }}
            ></input>
            <button onClick={handlerBid}>입찰</button> */}
        </>
    )
}

export default AuctionTest;