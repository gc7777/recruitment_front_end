import React from "react";
import { Table } from "react-bootstrap";
import { getAllLabourers, getLabourerById } from "../api/LabourerApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import UpcomingJobs from "../components/UpcomingJobs";
import RecruiterLabourerProfile from "../components/RecruiterLabourerProfile";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody, InputGroup } from "reactstrap";
import LabourersSelector from "../components/LabourersSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class RecruiterLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: [],
      page: 1,
      labourerIdToShowDetails: 0,
      isLoading: true,
      numberOfUpcomingJobs: 1,
      labourerSelected: {},
      labourerIdFromSelector: 1
    };
    this.getLabourersList = this.getLabourersList.bind(this);
    this.paginate = this.paginate.bind(this);
    this.changeActiveStatus = this.changeActiveStatus.bind(this);
  }

  componentDidMount() {
    this.getLabourersList();
  }

  getNumberOfUpcomingJobs = data => {
    this.setState({ numberOfUpcomingJobs: data });
    //console.log("Upcoming JOBS: " + this.state.numberOfUpcomingJobs);
  };

  getLabourersList = async () => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    await getAllLabourers({ token, page, count }).then(res => {
      if (res.status === 200) {
        this.setState({
          labourers: res.data.result,
          totalLabourer: res.data.totalRows,
          labourerIdToShowDetails: res.data.result[0].id,
          isLoading: false
        });
      } else {
        console.log("no response");
      }
    });
  };

  goToDetails = id => {
    this.setState({ labourerIdToShowDetails: id });
    let labourerSelected = this.state.labourers.find(l => l.id === id);
    this.setState({ labourerSelected: labourerSelected });
    //console.log(id);
  };

  changeActiveStatus = (currentLabourer, currentStatus) => {
    this.setState({
      labourers: this.state.labourers.map(item =>
        item.id === currentLabourer.id
          ? { ...item, isActive: currentStatus }
          : item
      )
    });
  };

  handleSearch = async () => {
    const PROF_ID = this.state.profId;
    const token = this.props.auth.JWToken;

    await getLabourerById({ token, PROF_ID })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.name,
            phone: res.data.phone,
            email: res.data.email,
            totalCompanies: 1
            // companies : res.data.result
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    console.log("Company" + this.state.companies);
  };

  renderTableData() {
    return this.state.labourers.map(labourer => {
      return (
        <tr
          key={labourer.id}
          onClick={() => {
            this.goToDetails(labourer.id);
          }}
        >
          <td>
            {labourer.firstName} {labourer.lastName}
          </td>
          <td>{labourer.phone}</td>
          <td>{labourer.email}</td>
          <td style={{ textAlign: "right" }}>
            {labourer.isActive === true ? (
              <span class="status-badge badge badge-pill badge-success">
                Active
              </span>
            ) : (
              <span class="status-badge badge badge-pill badge-secondary">
                Inactive
              </span>
            )}
          </td>
        </tr>
      );
    });
  }

  paginate = number => {
    this.setState(
      {
        page: number
      },
      () => {
        this.getLabourersList();
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <div>...Loading</div>
    ) : (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardBody>
                  <InputGroup>
                    <LabourersSelector
                      auth={this.props.auth}
                      placeholder="Select labourer"
                      onChange={labourer =>
                        this.setState({
                          labourerIdFromSelector:
                            labourer && labourer.length > 0
                              ? labourer[0].id
                              : null
                        })
                      }
                    />
                    <button
                      className="search-icon-button"
                      onClick={this.handleSearch}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </InputGroup>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                  </Table>
                  <Pagination
                    itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                    totalItem={this.state.totalLabourer}
                    paginate={this.paginate}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <RecruiterLabourerProfile
                {...this.props}
                labourerId={this.state.labourerIdToShowDetails}
                labourerSelected={this.state.labourerSelected}
                numberOfUpcomingJobs={this.state.numberOfUpcomingJobs}
                changeParentIsActiveStatusOfLabourer={(
                  currentLabourer,
                  currentStatus
                ) => this.changeActiveStatus(currentLabourer, currentStatus)}
              />
              <UpcomingJobs
                {...this.props}
                labourerId={this.state.labourerIdToShowDetails}
                numberOfUpcomingJobs={this.getNumberOfUpcomingJobs}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
