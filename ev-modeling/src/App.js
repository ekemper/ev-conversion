// import logo from './logo.svg';
// import Map from './Map'
import './App.css';
// import EnergyConsumptionModel from './model/EnergyConsumptionModel'
import ZeroToSixty from './model/ZeroToSixty'

// const consumptionModel = new EnergyConsumptionModel()
const model = new ZeroToSixty()

function App() {
  return (
    <div className="App">

      <pre>{JSON.stringify(model.in(), null, 4)}</pre>

      {/* <Map drivingRoute={consumptionModel.drivingRoute}></Map> */}

      {/* <h3>Total Energy Consumed For Route:</h3>
      <pre>{JSON.stringify(consumptionModel.EnergyConsumedForRouteJoules, null, 4)} joules</pre>
      <pre>{JSON.stringify(consumptionModel.EnergyConsumedForRouteKWh, null, 4)} KWh</pre>
      <h3>Energy Per Segment:</h3>
      <pre>{JSON.stringify(consumptionModel.drivingRoute, null, 4)}</pre> */}

    </div>
  );
}

export default App;
