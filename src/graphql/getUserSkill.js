import { useEffect, useState } from 'react';
import { initializeGraphQLClient } from '@/app/api/client';
import { GetFillupFormIdFromProfileDocument } from '@/gql/_generated';
import { GetSkillDropdDownListDocument } from '@/gql/_generated';



//THIS FILE IS TO QUERY USER SKILL AND DROPDOWN LIST OF SKILLS
//SO THAT WE CAN DISPLAY THE SKILLS IN THE PROFILE PAGE
//WE NEEDED TO QUERY USING THE SKILLS'S FIELD ID AND EXPIRY FIELD ID
//THE FIELD ID IS DIFFERENT FOR EACH ENVIRONMENT -PRODUCTION - STAGING
//PLEASE CHANGE THE FIELD ID ACCORDINGLY
//THIS IS DUE TO OUR DATABASE STRUCTURE

    // //STAGING
  // const skillFieldId = 25991;
  // const expiryFieldId = 25997;

  //Production
  const skillFieldId = 26015;
  const expiryFieldId = 26021;


const useUserSkill = (userId) => {
  const [dataSkill, setDataSkill] = useState(null);
  const [dropdownData, setDropdownData] = useState([]); // State to hold the dropdown data [options, loading, error
  
  const [errorSkill, setErrorSkill] = useState(null);
  const [errorDropdownlist, setErrorDropdownlist] = useState(null);

  const [isLoadingSkill, setIsLoadingSkill] = useState(true);
  const [isLoadingDropdownlist, setIsLoadingDropdownlist] = useState(true);

  const [client, setClient] = useState(null); // State to hold the GraphQL client







  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!client) {
          const initializedClient = await initializeGraphQLClient();
          setClient(initializedClient);
        }
  
        if (client) {
          const response = await fetchFillupFormIdFromProfile(client, userId);
  
          const skillData = response?.[0]?.skills;
          const skillIds = skillData?.split(',').map(skill => skill.trim());
  
          const responseDropdownlist = await fetchSkill(client, skillIds);
  
          setDataSkill(responseDropdownlist);
        }
      } catch (error) {
        setErrorSkill(error);
      } finally {
        setIsLoadingSkill(false);
      }
    };
  
    fetchData();
  }, [client, userId]);  // Added userId to the dependency array
  

  return { dataSkill, errorSkill, isLoadingSkill };
};


// Function to Fetch User Skills
const fetchFillupFormIdFromProfile = async (client, userId) => {
  try {
    const response = await client.request(GetFillupFormIdFromProfileDocument, { userId});
   
    return response?.profiles?.nodes;

  } catch (error) {
    console.error('Error fetching user skills:', error);
    throw error;
  }
};


// Function To Get Dropdownlist of All Skills
const fetchSkill = async (client,fillupFormId) => {



  try {
    // Perform GraphQL query using the client
    const response = await client.request(GetSkillDropdDownListDocument, { fillupFormId });

    const answers = [];
    let skillDropDownList = null;

 // Iterate through the nodes
  response?.fillupFormFields?.nodes?.forEach(node => {

  // Check if the field ID is for expiry
  if (node.fieldId == expiryFieldId) {
  
      const answer = {
          expiry: node.answer ? node.answer : null,
          skill: []
      };
      // Find corresponding skill node for this expiry

        const skillNode = response?.fillupFormFields?.nodes?.find(skillNode => skillNode.fieldId == skillFieldId && skillNode.fillupFormId == node.fillupFormId);

      if (skillNode) {
          const uuids = skillNode.answer ? JSON.parse(skillNode.answer) : skillNode.answer;
          answer.skill = uuids.map(uuid => ({ uuid: uuid, description: null }));
      }

      answers.push(answer);
  }
});
  

  //FETCHING SKILL DROPDOWN LIST


  skillDropDownList = response?.fillupFormFields?.nodes?.filter(a => a.fieldId == skillFieldId)
  .map(a => a.field?.fieldProperties?.nodes?.[0]?.value);


  const skillList = JSON.parse(skillDropDownList[0]);


      answers.map(a => a.skill.forEach(u => {

        const skill = skillList.find(skill => skill.uuid === u.uuid);
        if (skill) {
          u.description = skill.description;
        }
        
      }));


    return answers;
  } catch (error) {
    console.error('Error fetching dropdownlist:', error);
    throw error;
  }
};



export default useUserSkill;
     
