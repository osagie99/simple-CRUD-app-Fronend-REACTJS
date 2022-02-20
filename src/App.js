import React from "react";
import {Switch, Route} from 'react-router-dom'
import CreateStudent from './pages/student.component'
import AddStudent from './pages/addStudent.component'
import EditStudent from "./pages/editStudent.component";

function App() {
  return (
    <Switch >
      <Route exact path='/' component={CreateStudent} />
      <Route exact path='/add-student' component={AddStudent} />
      <Route path='/edit-student/:id' component={EditStudent} />
    </Switch>
  );
}

export default App;
