import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";

export default class CompanyProfile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
     companyname: " ",
     email : "",
     phone : "",
     Country: "",
     province: "",
     city: "",
     Address: ""
    }
  }

  updateProfile(){

  }
  render() {
    return (
    <Container>
          <Row>
            <Col className="p-5">
            <FormErrors formerrors={this.state.errors} />
              <form
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-4"
              >
                <p className="h1 mb-4">Company Profile</p>

                <label htmlFor='companyname' className='font-weight-bold'>Company Name </label>

                <input
                  type="text"
                  id="companyname"                  
                  className="form-control mb-4"        
                  value={this.state.companyname}
                  placeholder="Company Name"
                  onChange={e => this.setState({ companyname: e.target.value })}
                />

                <label htmlFor='email' className='font-weight-bold'>Email</label>

                <input
                  type="text"
                  id="email"                  
                  className="form-control mb-4"
                  placeholder="Company Email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />

                <label htmlFor='phone' className='font-weight-bold'>Phone </label>

                <input
                  type="text"
                  id="phone"                  
                  className="form-control mb-4"
                  placeholder="Contact No."
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />

                
                <label htmlFor='country' className='font-weight-bold'>Country </label>

                <input
                  type="text"
                  id="country"                  
                  className="form-control mb-4"
                  placeholder="Country"
                  value={this.state.country}
                  onChange={e => this.setState({ country: e.target.value })}
                />

                <label htmlFor='province' className='font-weight-bold'>Province</label>

                <input
                  type="text"
                  id="province"                  
                  className="form-control mb-4"
                  placeholder="province"
                  value={this.state.province}
                  onChange={e => this.setState({ province: e.target.value })}
                />

                <label htmlFor='city' className='font-weight-bold'>City </label>

                <input
                  type="text"
                  id="city"                  
                  className="form-control mb-4"
                  placeholder="City"
                  value={this.state.city}
                  onChange={e => this.setState({ city: e.target.value })}
                />

                <label htmlFor='address' className='font-weight-bold'>Address </label>

                <input
                  type="text"
                  id="address"                  
                  className="form-control mb-4"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                />

                <button
                  onClick={this.UpdateProfile}
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                 Update Profile
                </button>
                          
              </form>
            </Col>
          </Row>
        </Container>
    )
  }
}
