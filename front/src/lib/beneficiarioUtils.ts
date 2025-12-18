import { BeneficiarioStatus } from "@/types/Beneficiario";

export const getColorStatus = (status: BeneficiarioStatus) => {

  const normalizedStatus = status?.toUpperCase();

  switch (normalizedStatus){
    case "ATIVO":
      return "bg-[#D7EB89]"; 
    case "PENDENTE":
      return "bg-[#D4D4D4]";
    case "INATIVO":
      return "bg-[#FF8383]";
    default:
      return "bg-gray-400";
  }
};

export const formatStatus = (status: string) => {
  if (!status) return "";
  
  const lower = status.toLowerCase();

  return lower.charAt(0).toUpperCase() + lower.slice(1);
};