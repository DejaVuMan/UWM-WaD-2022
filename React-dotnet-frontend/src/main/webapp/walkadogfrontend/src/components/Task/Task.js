import React, {Component} from "react";
import {connect} from "react-redux";

import {saveTask, fetchTask, updateTask, fetchPriorities, fetchStatus} from "../../services/index";
import {Card, Form, Button, Col} from "react-bootstrap";
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MyToast from "../MyToast";
import axios from "axios";


class pies extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statusy: [],
            priorytety: [],
            show: false
        }
    }

    initialState = {
        id: '', tytul:'', opis:'', typ:'', przydzielonoDla:'', dniWyprowadzenia:'', wlasciciel:'', status:'', priorytet: ''
    }

    componentDidMount() {
        const piesId = +this.props.match.params.id;
        if(piesId) {
            this.findpiesById(piesId);
        }
        this.findAllPriorytety();
        this.findAllStatusy();
    }

    findAllPriorytety = () => {
        axios.get("http://localhost:4000/pies/priorytety")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    priorytety: [{value:'', display:'Ustal priorytet'}]
                        .concat(data.map(priorytet => {
                            return {value:priorytet, display:priorytet}
                        }))
                });
            });
    };

    findAllStatusy = () => {
        axios.get("http://localhost:4000/pies/statusy")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    statusy: [{value:'', display:'Ustal status'}]
                        .concat(data.map(status => {
                            return {value:status, display:status}
                        }))
                });
            });
    };

    // findAllPriorytety = () => {
    //     this.props.fetchPriorities();
    //     setTimeout(() => {
    //         let piesPriorities = this.props.piesObject.priorytety;
    //         if(piesPriorities) {
    //             this.setState({
    //                 priorytety: [{value:'', display:'Wybierz priorytety'}]
    //                     .concat(piesPriorities.map(priorytet => {
    //                         return {value: priorytet, display: priorytet}
    //                     }))
    //             })
    //             this.findAllStatusy();
    //         }
    //     }, 100)
    // }
    //
    // findAllStatusy = () => {
    //     this.props.fetchStatus();
    //     setTimeout(() => {
    //         let piesStatusy = this.props.piesObject.statusy;
    //         if(piesStatusy) {
    //             this.setState({
    //                 statusy: [{value:'', display:'Wybierz status'}]
    //                     .concat(piesStatusy.map(status => {
    //                         return {value: status, display: status}
    //                     }))
    //             })
    //         }
    //     }, 100)
    // }

    findpiesById = (piesId) => {
        this.props.fetchpies(piesId);
        setTimeout(() => {
            let pies = this.props.piesObject.pies;
            if(pies != null) {
                this.setState({
                    id: pies.id,
                    tytul: pies.tytul,
                    opis: pies.opis,
                    typ: pies.typ,
                    przydzielonoDla: pies.przydzielonoDla,
                    dniWyprowadzenia: pies.dniWyprowadzenia,
                    wlasciciel: pies.wlasciciel,
                    priorytet: pies.priorytet,
                    status: pies.status
                })
            }
        }, 1000)

    }

    resetpies = () => {
        this.setState(() => this.initialState);
    }


    submitpies = event => {
        event.preventDefault();

        const pies = {
            tytul: this.state.tytul,
            opis: this.state.opis,
            typ: this.state.typ,
            przydzielonoDla: this.state.przydzielonoDla,
            dniWyprowadzenia: this.state.dniWyprowadzenia,
            wlasciciel: this.state.wlasciciel,
            priorytet: this.state.priorytet,
            status: this.state.status

        };

        this.props.savepies(pies)
        setTimeout(() => {
            if (this.props.piesObject.pies != null) {
                this.setState({"show": true, "method": "post"});
                setTimeout(() => this.setState({"show": false}), 1500);
                setTimeout(() => this.piesList(), 1000);
            } else {
                this.setState({"show": false});
            }
        }, 1000);
        this.setState(this.initialState);
    }

    updatepies = event => {
        event.preventDefault();

        const pies = {
            id: this.state.id,
            tytul: this.state.tytul,
            opis: this.state.opis,
            typ: this.state.typ,
            przydzielonoDla: this.state.przydzielonoDla,
            dniWyprowadzenia: this.state.dniWyprowadzenia,
            wlasciciel: this.state.wlasciciel,
            priorytet: this.state.priorytet,
            status: this.state.status
        };

        this.props.updatepies(pies);
        setTimeout(() => {
            if(this.props.piesObject.pies != null) {
                this.setState({"show": true, "method":"put"});
                setTimeout(()=> this.setState({"show":false}), 1500);
                setTimeout(()=> this.piesList(), 1500);
            } else {
                this.setState({"show": false});
            }
        }, 2000)
        this.setState(this.initialState);
    }

    piesChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    piesList = () => {
        return this.props.history.push("/list");
    }

    render() {
        const {tytul, opis, typ, przydzielonoDla, dniWyprowadzenia, wlasciciel, priorytet, status} = this.state;

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> {this.state.id ? "Aktualizuj pies" : "Dodaj pies"}</Card.Header>
                    <Form onReset={this.resetpies} onSubmit={this.state.id ? this.updatepies : this.submitpies} id="piesFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTytul"}>
                                    <Form.Label>Tytul</Form.Label>
                                    <Form.Control
                                        name="tytul" required autoComplete="off"
                                        value={tytul}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj imie psa" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridOpis"}>
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        name="opis" required autoComplete="off"
                                        value={opis}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj opis psa" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTyp"}>
                                    <Form.Label>Typ</Form.Label>
                                    <Form.Control
                                        name="typ" required autoComplete="off"
                                        value={typ}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj typ psa" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPrzydzielonoDla"}>
                                    <Form.Label>Przydzielono dla</Form.Label>
                                    <Form.Control
                                        name="przydzielonoDla" required autoComplete="off"
                                        value={przydzielonoDla}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj nazwę użytkownika" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGriddniWyprowadzenia"}>
                                    <Form.Label>dniWyprowadzenia</Form.Label>
                                    <Form.Control
                                        name="dniWyprowadzenia" required autoComplete="off"
                                        value={dniWyprowadzenia}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj dni wyprowadzenia psa" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridwlasciciel"}>
                                    <Form.Label>wlasciciel</Form.Label>
                                    <Form.Control
                                        name="wlasciciel" required autoComplete="off"
                                        value={wlasciciel}
                                        onChange={this.piesChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj nazwę wlasciciela" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPriorytet"}>
                                    <Form.Label>Priorytet</Form.Label>
                                    <Form.Control as="select"
                                        custom onChange={this.piesChange}
                                        name="priorytet" value={priorytet}
                                        className={"bg-dark text-white"}>
                                        {this.state.priorytety.map(priorytet =>
                                            <option key={priorytet.value} value={priorytet.value}>
                                                {priorytet.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridStatus"}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select"
                                                  custom onChange={this.piesChange}
                                                  name="status" value={status}
                                                  className={"bg-dark text-white"}>
                                        {this.state.statusy.map(status =>
                                            <option key={status.value} value={status.value}>
                                                {status.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant={"success"} type={"submit"}>
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Aktualizuj" : "Zatwierdź"}
                            </Button>{' '}
                            <Button variant={"info"} type={"reset"}>
                                <FontAwesomeIcon icon={faUndo}/> Wyczyść
                            </Button>{' '}
                            <Button variant={"info"} type={"button"} onClick={() => this.piesList()}>
                                <FontAwesomeIcon icon={faList}/> Lista piesów
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show ={ this.state.show} message = {this.state.method ==="put" ? "dodanie psa zaktualizowano pomyślnie!" : "pies dodano pomyślnie!"} type = {"success"}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        piesObject: state.pies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savepies: (task) => dispatch(saveTask(task)),
        fetchpies: (taskId) => dispatch(fetchTask(taskId)),
        updatepies: (task) => dispatch(updateTask(task)),
        fetchPriorities: () => dispatch(fetchPriorities()),
        fetchStatus: () => dispatch(fetchStatus())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(pies);