import React from 'react';
import { Button, StyleSheet ,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure,LogoutButton } from '../redux/actions/loginActions';
import store from '../redux/index';

const LogoutButton = ({logout, onPress }) => (
    <TouchableOpacity >
    <Icon name="sign-out" size={25} color="#da291c" onPress={onPress} />
  </TouchableOpacity>
//   <Button title="Logout" onPress={onPress} />
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  isLoggedIn: state.login.isLoggedIn,
  error: state.login.error,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logoutSuccess());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
// export default LogoutButton;
