import crossFetch from 'cross-fetch';
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from './auth0Service';


let client: GraphQLClient; // Declare client variable with explicit type

async function customCrossFetch(input: RequestInfo | URL, init?: RequestInit) {

    const response = await crossFetch(input, init);
    console.log('yyyyy', response);
    // const body: unknown = await response.json();
    const clonedResponse = (await response.clone().json()) ;
  
    if (Array.isArray(clonedResponse.errors) && clonedResponse.errors.length === 1) {
      const firstError = clonedResponse.errors[0];
  
      switch (firstError.extensions?.code) {
        case 'INTERNAL_SERVER_ERROR':
          // The literal response must be thrown here to prevent stale data being
          // removed on the client in cases where the API server is not available.
          // This ensures cached client data can be usable until it can revalidate.
  
          throw clonedResponse; // eslint-disable-line @typescript-eslint/no-throw-literal
        default:
          return response;
      }
    }
  
    return response;
  }


  

   export const getAndLogAccessToken = async () => {
    // console.log('enter this function>>>>');
    try {

      const postGraphileToken = await getAccessToken();
    //    console.log('postgraphileToken>>>>',postGraphileToken);

  

       let parsedAuthToken = postGraphileToken ? JSON.parse(postGraphileToken): null

      if(parsedAuthToken.access_token){
        //  console.log('ada token--good', parsedAuthToken.access_token)


        //CHECK TOKEN EXPIRY
        if (parsedAuthToken.expirationTime > Date.now()) {

        return parsedAuthToken.access_token;
        }
        else{

          getAndLogAccessToken(); //need improvement on this code 

        }

     }
      else{

        getAndLogAccessToken();    //need improvement on this code
        }
      
    } catch (error) {
      console.error('Error getting access token from AsyncStorage:', error);
      throw error;
    }
  };


   const initializeGraphQLClient = async () => {

    const REACT_APP_GQL_HOST_GRAPHILE = 'https://form-staging2.sanspaper.com:20991/graphql';

    try {
        const authToken = await getAndLogAccessToken();

        //  console.log('DAPAT TAK TOKEN NIE', authToken)
        client = new GraphQLClient(REACT_APP_GQL_HOST_GRAPHILE, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
           // errorPolicy: 'all',
           // fetch: customCrossFetch,
        });
    } catch (error) {
        console.error('Error setting up GraphQL client:', error);
        throw error;
    }
  };


initializeGraphQLClient();

export { client };