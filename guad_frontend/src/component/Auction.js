import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const Auction = () => {
    const [bidPrice, setBidPrice] = useState();
    const [priceList, setPriceList] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
        bidPrice: '',
        itemNum: 0
      });
    useEffect(() => {
        setBidPrice(userData.bidPrice)
    }, [userData]);

    useEffect(() => {
        connect();

    }, [])

    const connect =()=>{
        let Sock = new SockJS('http://192.168.0.35:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/sub/public', onMessageReceived);
        // stompClient.subscribe('/sub/auction/1', onPrivateMessage);
        // stompClient.subscribe('/sub/auction/2', onPrivateMessage);

    }
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        // var payloadData = JSON.parse(payload.body);
        // if(privateChats.get(payloadData.senderName)){
        //     privateChats.get(payloadData.senderName).push(payloadData);
        //     setPrivateChats(new Map(privateChats));
        // }else{
        //     let list =[];
        //     list.push(payloadData);
        //     privateChats.set(payloadData.senderName,list);
        //     setPrivateChats(new Map(privateChats));
        // }
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setUserData({...userData, "bidPrice":payloadData.bidPrice})
        const newPriceList = priceList
        newPriceList.push(payloadData.bidPrice)
        setPriceList(newPriceList)
    }
    const onError = (err) => {
        console.log(err);
        
    }

    const handleBidPrice = (e) => setBidPrice(e.target.value)

    const sendValue=()=>{
        console.log("send : " + userData.bidPrice)
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                bidPrice: bidPrice
              };
              console.log(chatMessage);
              stompClient.send("/pub/message", {}, JSON.stringify(chatMessage));
            //   stompClient.send("/pub/auction/1", {}, JSON.stringify(chatMessage))
            //   stompClient.send("/pub/auction/2", {}, JSON.stringify(chatMessage))
              setUserData({...userData,"message": ""});
            }
    }
    console.log(priceList)
    return (
    <div className="container">
        <div className="chat-box">
            <div className="chat-content">
                <ul className="chat-messages">
                    {priceList.map((p, i) => (
                        <li key={i}>{p}</li>
                    ))}
                </ul>
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the price" value={bidPrice} onChange={handleBidPrice} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>
        </div>

        <h1 style={{textAlign: "center"}}>현재 입찰 가격</h1>
        <h1 style={{textAlign: "center"}}>{userData.bidPrice}</h1>
    </div>
    )
}

export default Auction;