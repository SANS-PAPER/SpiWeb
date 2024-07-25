"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useUserStore } from "@/store/user/userStore";
import {useUserData} from "@/graphql/useUserData";
import { UserProfile } from "./types/userProfile";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Input, Select, Switch } from 'antd';

const Profile = ({route}: {route:any}) => {

  const { userId, userAuth } = useUserStore();
  const { dataUser, errorUser, isLoadingUser } = useUserData(userId || "");
  const { Option } = Select;
  const [isAvailableToWork, setIsAvailableToWork] = useState(false);
  const [preferredLocation, setPreferredLocation] = useState('');

  const handleAvailabilityChange = (checked:any) => {
    setIsAvailableToWork(checked);
    console.log(`Available to work: ${checked}`);
    // Handle the change event here, e.g., update state or make an API call
  };

  const handleLocationChange = (event:any) => {
    setPreferredLocation(event.target.value);
    console.log(`Preferred location: ${event.target.value}`);
    // Handle the change event here, e.g., update state or make an API call
  };

  const [images, setImages] = useState([
    '/images/cards/cards-02.png',
    '/images/cards/cards-02.png',
    '/images/cards/cards-02.png',
    '/images/cards/cards-02.png',
  ]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingGallery, setIsEditingGallery] = useState(false);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [bio, setBio] = useState(dataUser?.[0]?.summaryBio || "No description");

  const handleEdit = () => {
    setIsEditingProfile(true);
  };

  const handleEditGallery = () => {
    setIsEditingGallery(true);
  };

  const handleSave = () => {
    // Here you can add the logic to save the updated bio, e.g., make an API call
    setIsEditingProfile(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImages([...images, newImage]);
    }
  };

  const saveGalleryChanges = () => {
    setImages(prev => [...prev, ...newImages]);
    setNewImages([]);
    setIsEditingGallery(false); // Exit edit mode
  };


  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleGalleryEditing = () => {
    setIsEditingGallery((prev) => !prev);
    if (isEditingGallery) {
      // Save changes when exiting edit mode
      saveGalleryChanges();
    }
  };

  const handleWorkTypeChange = (value:any) => {
    console.log(`Selected work type: ${value}`);
    // Handle the change event here, e.g., update state or make an API call
  };

  return (
    <DefaultLayout>
      <div className="mx-auto ">
        <Breadcrumb pageName="Profile" />
        <div>
    </div>
      
    <div className="flex space-x-4 bg-white">
    <div className="flex-[0.3]">
        <div className="overflow-hidden rounded-md bg-white shadow-default  dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
            
            </div>
          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-45 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 overflow-hidden">
  <div className="relative w-full h-full rounded-full overflow-hidden drop-shadow-2">
    <Image
      src={userAuth?.picture ?? "/images/logo/SansPaperID.svg"}
      width={160}
      height={160}
      alt="profile"
      className="object-cover w-full h-full"

    />
  </div>
  <label
    htmlFor="profile"
    className="absolute bottom-0 left-30 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2 z-40"
    style={{ zIndex: 40 }} 
  >
    <svg
      className="fill-current"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
        fill=""
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
        fill=""
      />
    </svg>
    <input
      type="file"
      name="profile"
      id="profile"
      className="sr-only"
    />
  </label>
</div>

            <div className="mt-4">
              <h3 className="align-left mb-1.5 font-semibold mb-5">
                Contact Information
              </h3>
              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Phone :</p>
                <p className=" font-medium">{dataUser?.[0]?.phoneNumber}</p>
              </div>

              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Address :</p>
                <p className=" font-medium">{dataUser?.[0]?.profile?.address}</p>
              </div>
              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Email :</p>
                <p className=" font-medium">{dataUser?.[0]?.email}</p>
              </div>

              {/* Preferences */}
              <h3 className="mt-8 mb-1.5  font-semibold ">
                Preferences
              </h3>
              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Preferred Work Type :</p>
                <Select
                  defaultValue="Full-time"
                  style={{ width: 120 }}
                  onChange={handleWorkTypeChange}
                >
                  <Option value="Full-time">Full-time</Option>
                  <Option value="Part-time">Part-time</Option>
                  <Option value="Contract">Contract</Option>
                </Select>
              </div>
              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Available To Work:</p>
                <Switch
                  checked={isAvailableToWork}
                  onChange={handleAvailabilityChange}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </div>
              <div className="flex items-center mt-2 ml-2">
                <p className="text-black font-semibold mr-2">Prefered Location(s): </p>
                <Input
                  value={preferredLocation}
                  onChange={handleLocationChange}
                  placeholder="Enter preferred location"
                  style={{ width: 200 }}
                />
              </div>

            </div>
          </div>
        </div>
        </div>
        <div className="flex-[0.7] mt-10" >
              <div className="text-black font-bold text-xl">
                {dataUser?.[0]?.name}
              </div>
              <p className=" font-medium">{dataUser?.[0]?.jobTitle}</p>
              <p className=" mt-2 text-black font-medium">Public Profile</p>
              <div className="mt-10 flex items-center">
                <div className="">
                <p className="mr-10">FORM SUBMITTED</p>
                <p className="text-black font-semibold">200</p>
                </div>
                <div className="">
                <p className="mr-10">TRAINING COMPLETED</p>
                <p className="text-black font-semibold ">50</p>
                </div>
              </div>
              <p className="mt-5">Ranking</p>
              <div className="flex mb-10">
                <p className="mr-10">8.6</p>
                <div></div>
              </div>

              {/* Gallery section */}
              <div className="mt-10 mb-5 mr-3">
        <div className="flex items-center justify-between mb-5">
          <p className="font-bold text-lg">Gallery</p>
          <button
            onClick={toggleGalleryEditing}
            className="flex items-center px-4 py-2 text-blue rounded-md"
          >
            <FontAwesomeIcon icon={isEditingGallery ? faSave : faEdit} className="mr-2" />
            {isEditingGallery ? 'Save' : 'Edit'}
          </button>
        </div>
        {isEditingGallery && (
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
        )}
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative mr-10 mb-4">
              <img src={image} className="w-40 h-28 object-cover" alt={`Gallery Image ${index + 1}`} />
              {isEditingGallery && (
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

                {/* Profile description */}
                <div className="mt-10 mb-5 mr-3">
              <div className="flex justify-between items-center mb-5">
                <p className="font-bold text-lg">PROFILE DESCRIPTION</p>
                {!isEditingProfile && (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-blue rounded-md"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit
                  </button>
                )}
              </div>
              <div className="bg-gray p-4 rounded-lg relative">
                {isEditingProfile ? (
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-40 p-2 border border-gray-300 rounded-md"
                    />
                    <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-black">{bio}</p>
                  </div>
                )}
              </div>
            </div>


                {/* Skills */}
              <div className="mt-10 mb-5 mr-3">
                  <p className="font-bold text-lg mb-5">SKILLS</p>
                  <div>
                    <p className="text-black">Leadership and Team Coordination</p>
                    <p className="text-black mt-2">Experience : 6 - 10 years</p>
                  </div>
              </div>
              
              {/* Other Skills */}
              <div className="mt-10 mb-5 mr-3">
                  <p className="font-bold text-lg mb-5"> OTHER SKILLS</p>
                  <div>
                    <p className="text-black font-md">Construction Management</p>
                    <p className="text-black mb-5">Experience : 3 - 5 years</p>
                    <p className="text-black font-md">Safety Compliance</p>
                    <p className="text-black mb-5">Experience : 2 - 5 years</p>
                  </div>
              </div>

        </div>
        
        </div>

          

      </div>
    </DefaultLayout>
  );
};

export default Profile;
