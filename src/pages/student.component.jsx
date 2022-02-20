import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Student extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      loading: true,
    };
  }
  async componentDidMount() {
    const res = await axios.get("http://127.0.0.1:8000/api/students");
    //  console.log(res);
    if (res.data.status === 200) {
      this.setState({
        students: res.data.students,
        loading: false,
      });
    }
  }
  handleDelete = async (e, id) => {

    const thisButtonClicked = e.currentTarget;
    thisButtonClicked.innerText = "Deleting";
    thisButtonClicked.disabled = true;
    const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);
    
    if(res.data.status === 200) {
      thisButtonClicked.closest("tr").remove();
      swal({
        title: "Student Deleted Succesfully",
        text: res.data.message,
        icon: "success",
        button: "OK!",
      });
      thisButtonClicked.innerText = "Delete";
      thisButtonClicked.disabled = false;
      // console.log(res.data.message);
    }
  }
  render() {
    var table_Data = "";
    if (this.state.loading) {
      table_Data = (
        <tr>
          <td colSpan="7">
            <h2>Loading ...</h2>
          </td>
        </tr>
      );
    } else {
      table_Data = this.state.students.map((student) => {
        return (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>
              <Link
                to={`edit-student/${student.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                to={`delete-student/${student.id}`}
                className="btn btn-danger btn-sm"
                onClick={(e) => this.handleDelete(e, student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Student
                  <Link
                    to={"/add-student"}
                    className="btn btn-primary btn-sm float-end"
                  >
                    Add Student
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{table_Data}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
