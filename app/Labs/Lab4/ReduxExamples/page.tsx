import HelloRedux from "./HelloRedux/page";
import CounterRedux from "./CouterRedux/page";
import AddRedux from "./AddRedux/page";


export default function ReduxExamples() {
    return (
        <div>
            <h2>Redux Examples</h2>
            <HelloRedux/>
            <CounterRedux/>
            <AddRedux/>
        </div>
    );
};