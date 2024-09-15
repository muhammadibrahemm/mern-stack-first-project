import { UseTokenContext } from '../../Hooks/useContext/setToken'
import './About.css'

export const About = () => {
    const {userData} = UseTokenContext();
    return(
        <>
            <div className="about-main-container">
                <div className="upper-portion">
                    <div className="upper-portion-left">
                        <h3>{userData?.username || ""}</h3>
                <h1>Why Choose Us?</h1>
                <p>Expertise: Our team consists of experience IT professionals who are passionate about staying up-to-date with the latest industry trends.</p>
                <p>Customization: We understand that every business is unique. That's why we create solutions that are tailored to your specific needs and goals.</p>
                <p>Customer-Centric Approach: We prioritize your statisfaction and provide top-notch support to address your IT concerns.</p>
                <p>Affordability: We offer competitive pricing without compromising on the quality of our services.</p>
                <p>Reliability: Count on us to there when you need us. We're committed to ensuring your IT environment is reliable and available 24/7.</p>
                <div>
                    <button className='first'><span className='nowrap'>Contact Now</span></button>
                    <button className='second'><span className='nowrap'>Learn More</span></button>
                    </div>
                </div>
                <div className="upper-portion-right">
                        <img src="images/about.png" alt="about" width={300} height={"auto"} />
                    </div>
                </div>
                <div className="home-container-middle">
            <div><h1>50+</h1><p>Company Registered</p></div>
            <div><h1>150+</h1><p>Project Done</p></div>
            <div><h1>250+</h1><p>Happy Clients</p></div>
            <div><h1>650K+</h1><p>Youtube Subcribers</p></div>
                </div>
            </div>
        </>
    )
}