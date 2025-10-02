import {FaHandHoldingMedical, FaHandHoldingHeart, FaHandHoldingUsd,FaHandHoldingWater ,FaHandHolding,FaHands  } from "react-icons/fa"
export default function ReactIconSampler() {
    return (
        <div id ="wd-react-icons-sampler" className ="mb-4">
            <h3>React Icons Sampler</h3>
            <div className = "d-flex">
                <FaHandHolding className = "fs-3 text"/>
                <FaHandHoldingMedical className = "fs-3 text"/>
                <FaHandHoldingHeart className = "fs-3 text"/>
                <FaHandHoldingUsd className = "fs-3 text"/>
                <FaHandHoldingWater className = "fs-3 text"/>
                <FaHands className = "fs-3 text"/>
            </div>
        </div>
    );
}