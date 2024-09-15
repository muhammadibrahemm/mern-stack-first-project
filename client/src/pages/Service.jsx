import './service.css';
import { UseTokenContext } from "../Hooks/useContext/setToken";

export const Service = () => {
    const { services } = UseTokenContext();
    return (
        <>
            <h1 className='main-h1'>Services</h1>
            <div className="cards-container-services">
                {
                    services.map((currEle) => {
                        const { _id, provider, price, service, description } = currEle;
                        return (
                            <div className="main-container-services" key={_id}>
                                <img src="images/home-end.png" alt="Service Image" width={300} />
                                <div className="grid-two-cols">
                                    <p>{provider}</p>
                                    <p className="price">{price}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};
