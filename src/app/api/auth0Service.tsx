import axios from 'axios';
import Swal from 'sweetalert2';

function showAlert() {
    Swal.fire({
      title: 'Alert!',
      text: 'Auth0 Postgraphile: Please refresh/relogin',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }


export const getAccessToken = async () => {
    const auth0Endpoint = 'https://sanspaper.au.auth0.com/oauth/token';
    const clientId = 'N33iarTDdXhC8aWidlOjxYWV7GqSrc2p';
    const clientSecret = '1hLQJlFrsst9SBZQ18tX-96JsjF-B3pglDQa-P679fVUs2Vrj69mfIhWRn-pzjr5';
    const audience = 'https://sanspaper.com/postgraphile';
    const grantType = 'client_credentials';

     console.log('masuk file getAccessToken------------------');

  
     try {
      const response = await axios.post(auth0Endpoint, {
        client_id: clientId,
        client_secret: clientSecret,
        audience: audience,
        grant_type: grantType,
      });
  
      const { access_token, token_type, expires_in } = response.data;

      const expirationTime = new Date().getTime() + expires_in * 1000;



    //   AsyncStorage.setItem('@postgraphile_token', JSON.stringify({ access_token, expirationTime }));
    
    sessionStorage.setItem('@postgraphile_token', JSON.stringify({ access_token, expirationTime }));


      // console.log('access_token------for postgraphile is ------------', access_token);



      return `${JSON.stringify({ access_token, expirationTime })}`;
    } catch (error) {
      //Alert.alert('Auth0 Postgraphile Error', 'Please refresh/relogin');
        alert('Auth0 Postgraphile Error: Please refresh/relogin');

      throw error;
    }
  };