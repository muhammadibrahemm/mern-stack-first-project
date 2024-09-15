import { useEffect, useState } from 'react'
import './Contact.css'
import { UseTokenContext } from '../../Hooks/useContext/setToken'

export const Contact = () => {

    const {userData,isloggedIn,setUserData} = UseTokenContext();
    

    const [userContactDetails, setUserContactDetails] = useState({
        username:userData?.username || "",
        email:userData?.email || "",
        message:""
    })

    if(!isloggedIn){
        setUserData(null)
    }

    const handleContactInput = (e) => {
        const {name, value} = e.target;
        const object = {...userContactDetails,[name]:value};
        setUserContactDetails(object);
    }

    

    const handleSubmitContactDetails = async(e) => {
        e.preventDefault();

        const jsonObject = JSON.stringify(userContactDetails);
        console.log("contact object:",jsonObject);

        try {
            const res = await fetch("http://localhost:8700/api/form/contact",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: jsonObject
            })

            if(res.ok)
            {
                const data = await res.json();
                console.log(data);
            }

        } catch (error) {
            console.log("error in sending contact form details to db via fetch ",error);
        }
        
        setUserContactDetails({
            username:userData?.username || "",
            email:userData?.email || "",
            message:""
        });
    }

 

    return(
        <>
            <div className="contact-main-container">
                <h1>Contact Us</h1>
                <div className="contact-sub-container">
                    <div className="contact-left-container">
                        <img src="images/contact.png" alt="" width={350} />
                    </div>
                    <div>
                        <form onSubmit={handleSubmitContactDetails}>
                            <p>
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" name="username" id="username" placeholder="username" required autoComplete="off"
                                    value={userContactDetails.username}
                                    onChange={handleContactInput}
                                />
                            </p>
                            <p>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" name="email" id="email" placeholder="email" required autoComplete="off"
                                    value={userContactDetails.email}
                                    onChange={handleContactInput}
                                />
                            </p>
                            <p>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" placeholder='enter your comments please'
                                    value={userContactDetails.message}
                                    onChange={handleContactInput}
                                ></textarea>
                            </p>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
                <div className='map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.8259608252256!2d126.95462387432235!3d37.46483092995608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9fe8a0a1e2a5%3A0xa1e2eebc04f0c5e7!2sSeoul%20National%20University%20(SNU)%2C%20Gwanak%20Campus!5e0!3m2!1sen!2s!4v1724177668122!5m2!1sen!2s" width="100%" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}