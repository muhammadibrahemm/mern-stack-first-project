import './Home.css'

export const Home = () => {
    return (
        <>
        <div className="home-container-upper">
            <div className="home-left">
                <p>We are the World Best IT Company</p>
                <h1>Welcome to Muhammad Ibraheem</h1>
                <p>Are you ready to take your business to the next level with cutting-edge IT solutuion? Look no further! At Muhammad Ibraheem, we specialize in providing innovative IT services and solutions tailored to meet your unique needs</p>
                <div>
                    <button className='first'><span className='nowrap'>Connect Now</span></button>
                    <button className='second'><span className='nowrap'>Learn More</span></button>
                </div>
            </div>
            <div className="home-right">
                <img src="images/home.png" alt="" width={400} height={"auto"}/>
            </div>
        </div>
        <div className="home-container-middle">
            <div><h1>50%</h1><p>Registered Companies</p></div>
            <div><h1>100,00+</h1><p>Happy Clients</p></div>
            <div><h1>500+</h1><p>Well Known Developers</p></div>
            <div><h1>24/7</h1><p>Service</p></div>
        </div>
        <div className="home-container-upper">
        <div className="home-right">
                <img src="images/home-end.png" alt="" width={350} height={"auto"}/>
            </div>
            <div className="home-left">
                <p>We are here to help you</p>
                <h1>Get Started Today</h1>
                <p>Ready to take the first step towards a more efficient and secure IT infrastructure? Contact us today for a free consultation and let's discuss how Muhammad Ibraheem can help your business thrive in the digital age</p>
                <div>
                    <button className='first'><span className='nowrap'>Contact Now</span></button>
                    <button className='second'><span className='nowrap'>Learn More</span></button>
                </div>
            </div>
            
        </div>
        
        </>
    )
}