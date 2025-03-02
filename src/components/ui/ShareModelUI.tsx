import React from 'react'
import { FaCopy } from 'react-icons/fa';
import { IoLogoFacebook, IoLogoTwitter, IoLogoWhatsapp } from 'react-icons/io';

interface ShareModelUIProps {
    id:number | undefined;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModelUI: React.FC<ShareModelUIProps> = ({id,setIsModalOpen }) => {
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleCopy = () => {
        const textToCopy = `Watch Premiun Porn: https://bluetv.xyz/videos/${id}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert("Website link copied to clipboard!"))
                .catch((error) => console.error("Failed to copy text: ", error));
        } else {
            const textArea = document.createElement('textarea'); // Fallback for older devices and browsers
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices
            try {
                document.execCommand('copy');
                alert("Website link copied to clipboard!");
            } catch (error) {
                console.error("Fallback: Oops, unable to copy", error);
            }

            document.body.removeChild(textArea);
        }
    };
    const websiteUrl = `https://bluetv.xyz/videos/${id}`;
    const whatsappShare = `whatsapp://send?text=${encodeURIComponent(websiteUrl)}`;
    const twitterShare = `twitter://post?message=${encodeURIComponent(websiteUrl)}`;
    const facebookShare = `fb://share?u=${encodeURIComponent(websiteUrl)}`;
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-[--light-blue] open-sans p-4 rounded-lg w-11/12 max-w-md text-[--medium-blue]">
                    <h2 className="text-lg font-semibold mb-3">Share this video</h2>
                    <div className="flex flex-wrap justify-between mb-3 gap-3">
                        <button
                            className="flex items-center gap-2 bg-green-500 p-2 rounded-lg text-white"
                            onClick={() => window.open(whatsappShare, '_blank')}
                        >
                            <IoLogoWhatsapp /> WhatsApp
                        </button>
                        <button
                            className="flex items-center gap-2 bg-blue-500 p-2 rounded-lg text-white"
                            onClick={() => window.open(twitterShare, '_blank')}
                        >
                            <IoLogoTwitter /> Twitter
                        </button>
                        <button
                            className="flex items-center gap-2 bg-blue-600 p-2 rounded-lg text-white"
                            onClick={() => window.open(facebookShare, '_blank')}
                        >
                            <IoLogoFacebook /> Facebook
                        </button>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg w-full justify-center"
                        onClick={handleCopy}
                    >
                        <FaCopy /> Copy Link
                    </button>
                    <button
                        className="mt-3 bg-red-500 p-2 rounded-lg text-white w-full"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default React.memo(ShareModelUI);