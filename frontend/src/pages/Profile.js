import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user_id, setUserId] = useState();
    const [user_email, setUserEmail] = useState();
    const [user_profile, setUserProfile] = useState();

    const getProfile = async () => {
        try {
            // Kakao SDK API를 이용하여 사용자 정보 획득
            let data = await window.Kakao.API.request({
                url: "/v2/user/me",
                data: {
                    property_keys: ['kakao_account.email'],
                },
            });

            console.log("(Kakao) data : ", data);
            console.log("(Kakao) id : ", data.id);
            console.log("(Kakao) email : ", data.email);        
            

            // 사용자 정보 변수에 저장
            //setUserId(data.email);
            //setUserEmail(data.name);
            //setUserProfile(data.profile);
        } catch(error) {
            console.log(error);
        }

    };

    useEffect( () => {
        getProfile();
    }, []);

    return (
        <div>
            <h2>{user_id}</h2>
            <h2>{user_email}</h2>
            <img src={user_profile} />
        </div>

    );
}

export default Profile;