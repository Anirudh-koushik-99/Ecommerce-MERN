import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {toast} from 'react-toastify'
import { useLogoutMutation } from "../slices/usersApiSlice";
import { removeCredentials } from "../slices/authSlice";
import logo from "../assets/logo.png";

const Header = () => {
  const {cartItems} = useSelector((state) => state.cart)
  const {userInfo} = useSelector((state) => state.auth)
  console.log(cartItems)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    console.log('logout')
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} alt="Proshop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    /*BADGE IS A REACT BOOTSTRAP COMPONENT WHICH IS JUST A ROUNDED BACKGROUND */
                    <Badge pill bg='success' style={{marginLeft: '5px'}}>{cartItems.reduce((acc, curr) => acc + curr.qty, 0)}</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (<NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>) : (<> <LinkContainer to={'/login'}>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer></>)}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
