import React from "react";
import Image from "next/image";
interface FormFieldImageLabelT {
  src: string;
}

const FormFieldImageLabel: React.FC<FormFieldImageLabelT> = ({ src }) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt="profile photo"
          width={96}
          height={96}
          priority
          className="object-contain rounded-full min-w-[96px]"
        />
      ) : (
        <Image
          src="/assets/profile.svg"
          alt="profile photo"
          width={24}
          height={24}
          className="object-contain"
        />
      )}
    </>
  );
};

export default FormFieldImageLabel;
