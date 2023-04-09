// import React, { Component } from 'react';
// import '../../stylesheets/boardheader.scss';
//
// import _ from 'lodash';
// import React, { Component } from 'react';
// import { Divider, Tab } from 'semantic-ui-react';
//
// const colors = [ 'blue',]
//
// const panes = [
//   { menuItem: 'FoundBoard', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
//   { menuItem: 'LostBoard', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
//   { menuItem: 'OldBoard', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
//   { menuItem: 'ResolveBoard', render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane> },
// ]
//
// class TabExampleColoredInverted extends Component {
//   state = { color: colors[0] }
//
//   handleColorChange = e => this.setState({ color: e.target.value })
//
//   render() {
//     const { color } = this.state
//
//     return (
//       <div>
//         <Divider hidden />
//         <Tab menu={{ color, inverted: true, attached: false, tabular: false }} panes={panes} />
//       </div>
//     )
//   }
// }
//
// export default TabExampleColoredInverted
// import React from 'react'
// import { Container, Row, Col } from 'reactstrap';
//
// const HeaderExampleTextAlignment = () => (
//
// <div class="ui grid container">
//   <div class="four wide column">
//   <a href="http://52.79.122.22:8000/board/found">FoundBoard</a>
//   </div>
//   <div class="four wide column">
//   <a href="http://52.79.122.22:8000/board/lost">LostBoard</a>
//   </div>
//   <div class="four wide column">
//   <a href="http://52.79.122.22:8000/board/old">OldBoard</a>
//   </div>
//   <div class="four wide column">
//   <a href="http://52.79.122.22:8000/board/resolve">ResolveBoard</a>
//   </div>
//
// </div>
//
// )
//
// export default HeaderExampleTextAlignment;
import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, Navbar } from 'reactstrap';

export default class BoardHeader extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="lg">
            <Nav className="mr-auto" pills>
              <Container>
                      <Row >
                        <Col >
                          <NavItem>
                            <NavLink href="http://52.79.122.22:3000/board/found/page/1">
                              <p className="font-weight-bold">FoundBoard</p>
                            </NavLink>
                          </NavItem>
                        </Col>
                        <Col >
                          <NavLink href="http://52.79.122.22:3000/board/lost/page/1">
                            <p className="font-weight-bold">LostBoard</p>
                          </NavLink>
                        </Col>
                        <Col >
                          <NavLink href="http://52.79.122.22:3000/board/old/page/1">
                            <p className="font-weight-bold">OldBoard</p>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink href="http://52.79.122.22:3000/board/resolve/page/1">
                            <p className="font-weight-bold">ClosedBoard</p>
                          </NavLink>
                        </Col>
                      </Row>
                </Container>
            </Nav>
        </Navbar>
      </div>
//  <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
//       <Nav navbar>
//         <br/>
//       <Container>
//         <Row>
//           <Col>
//             <NavItem>
//               <NavLink href="http://52.79.122.22:8000/board/found">
//                 <p className="font-weight-bold">FoundBoard</p>
//               </NavLink>
//             </NavItem>
//           </Col>
//           <Col>
//             <NavLink href="http://52.79.122.22:8000/board/lost">
//               <p className="font-weight-bold">LostBoard</p>
//             </NavLink>
//           </Col>
//           <Col>
//             <NavLink href="http://52.79.122.22:8000/board/old">
//               <p className="font-weight-bold">OldBoard</p>
//             </NavLink>
//           </Col>
//           <Col>
//             <NavLink href="http://52.79.122.22:8000/board/resolve">
//               <p className="font-weight-bold">ResolveBoard</p>
//             </NavLink>
//           </Col>
//         </Row>
//       </Container>
// </Nav>
// </div>
    );
  }
}


// class BoardHeader extends Component {
//   render() {
//     return (
//       <div>
//         <ul className="bh">
//           <li><a href="http://52.79.122.22:8000/board/found">FoundBoard</a></li>
//           <li><a href="http://52.79.122.22:8000/board/lost">LostBoard</a></li>
//           <li><a href="http://52.79.122.22:8000/board/old">OldBoard</a></li>
//           <li><a href="http://52.79.122.22:8000/board/resolve">ResolveBoard</a></li>
//         </ul>
//       </div>
//     );
//   }
// }
//
// BoardHeader.propTypes = propTypes;
// BoardHeader.defaultProps = defaultProps;
//
// export default BoardHeader;
