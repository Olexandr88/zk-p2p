import "module-alias/register";
import { BigNumber } from "ethers";
import { ONE_DAY_IN_SECONDS, THREE_MINUTES_IN_SECONDS, ZERO } from "@utils/constants";
import { ether, usdc } from "@utils/common/units";
import { TLSParams } from "@utils/types";

// Deployment Parameters
export const SERVER_KEY_HASH = {
  "venmo": [
    "0x2ea3f223adbee4865e0cbfa3a6e748b1505a0094fd92c53d3d0dd2d4b0cd19d3", // selector: lycwyfwp74k6gitv7a7jiergkl3mgkrg
    // Below modulus hashes are out of date because they use an old hashing algorithm
    //"0x1163C7F4AF2E63FE2DCB73B8EDF51A3AC04A257979D7877EDFE4AB37B9C807B1",   // selector: lycwyfwp74k6gitv7a7jiergkl3mgkrg
  ],
  "hdfc": [
    "0x23421f99fa0b530a42c1d1cd7c7b45e09cf4a02963646248bee3ec4aee13c214", // acls01
    "0x2d6f556514af89727d18b24fc9f30e24015663eb289cb69c712b5814420b3fed" // acls03
    // Below modulus hashes are out of date because they use an old hashing algorithm
    // "0x06b0ad846d386f60e777f1d11b82922c6bb694216eed9c23535796ac404a7dfa", // acls01
    // "0x1c1b5a203a9f1f15f6172969b9359e6a7572001de09471efd1586a67f7956fd8" // acls03
  ],
  "garanti": [
    "0x03a9c8babd6b4ad94d711f3ffbee84b7aa69f4cb0dd08d491c5a5c32eca15f60", 
  ]
};

export const FROM_EMAIL = {
  "venmo": "venmo@venmo.com",
  "hdfc": "alerts@hdfcbank.net",
  "garanti": "garanti@info.garantibbva.com.tr",
};

interface EnvironmentTLSParams {
  [environment: string]: TLSParams;
}

export const ACCOUNT_TLS_PARAMS = {
  "wise": {
    "localhost": {
      verifierSigningKey: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "POST https://wise.com/gateway/v1/payments",
      host: "wise.com",
    } as TLSParams,
  } as EnvironmentTLSParams,
  "revolut": {
    "localhost": {
      verifierSigningKey: "0x166338393593e85bfde8B65358Ec5801A3445D12",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "GET https://app.revolut.com/api/retail/user/current",
      host: "app.revolut.com",
    } as TLSParams,
    "sepolia": {
      verifierSigningKey: "0x166338393593e85bfde8B65358Ec5801A3445D12",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "GET https://app.revolut.com/api/retail/user/current",
      host: "app.revolut.com",
    } as TLSParams,
    "base_staging": {
      verifierSigningKey: "0x166338393593e85bfde8B65358Ec5801A3445D12",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "GET https://app.revolut.com/api/retail/user/current",
      host: "app.revolut.com",
    } as TLSParams,
    "base": {
      verifierSigningKey: "0x166338393593e85bfde8B65358Ec5801A3445D12",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "GET https://app.revolut.com/api/retail/user/current",
      host: "app.revolut.com",
    } as TLSParams,
  } as EnvironmentTLSParams,
}

export const OFFRAMPER_TLS_PARAMS = {
  "wise": {
    "localhost": {
      verifierSigningKey: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      notaryKeyHash: BigNumber.from("113116629262703480258914951290401242193028831780154554089583031844538369800942").toHexString(),
      endpoint: "GET https://wise.com/gateway/v3/profiles/*/transfers",
      host: "wise.com",
    } as TLSParams,
    "base": {} as TLSParams,
  } as EnvironmentTLSParams,
}

export const SEND_TLS_PARAMS = {
  "wise": {
    "localhost": {
      verifierSigningKey: "",             // We don't pass this in for deploys
      notaryKeyHash: ZERO.toHexString(),  // We don't pass this in for deploys
      endpoint: "GET https://wise.com/gateway/v3/profiles/*/transfers",
      host: "wise.com",
    } as TLSParams,
    "base": {} as TLSParams,
  } as EnvironmentTLSParams,
  "revolut": {
    "localhost": {
      verifierSigningKey: "",             // We don't pass this in for deploys
      notaryKeyHash: ZERO.toHexString(),  // We don't pass this in for deploys
      endpoint: "GET https://app.revolut.com/api/retail/transaction/*",
      host: "app.revolut.com",
    } as TLSParams,
    "sepolia": {
      verifierSigningKey: "",             // We don't pass this in for deploys
      notaryKeyHash: ZERO.toHexString(),  // We don't pass this in for deploys
      endpoint: "GET https://app.revolut.com/api/retail/transaction/*",
      host: "app.revolut.com",
    } as TLSParams,
    "base_staging": {
      verifierSigningKey: "",             // We don't pass this in for deploys
      notaryKeyHash: ZERO.toHexString(),  // We don't pass this in for deploys
      endpoint: "GET https://app.revolut.com/api/retail/transaction/*",
      host: "app.revolut.com",
    } as TLSParams,
    "base": {
      verifierSigningKey: "",             // We don't pass this in for deploys
      notaryKeyHash: ZERO.toHexString(),  // We don't pass this in for deploys
      endpoint: "GET https://app.revolut.com/api/retail/transaction/*",
      host: "app.revolut.com",
    } as TLSParams,
  } as EnvironmentTLSParams,
}

export const TIMESTAMP_BUFFER = {
  "venmo": BigNumber.from(30),
  "hdfc": BigNumber.from(30),
  "garanti": BigNumber.from(30),
  "wise": BigNumber.from(30),
  "revolut": BigNumber.from(30),
};

export const MIN_DEPOSIT_AMOUNT: any = {
  "venmo": {
    "localhost": usdc(20),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(20),
    "base_staging": usdc(10),
  },
  "hdfc": {
    "localhost": usdc(21),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(20),
    "base_staging": usdc(10),
  },
  "garanti": {
    "localhost": usdc(21),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(20),
    "base_staging": usdc(10),
  },
  "wise": {
    "localhost": usdc(21),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(20),
    "base_staging": usdc(10),
  },
  "revolut": {
    "localhost": usdc(22),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(20),
    "base_staging": usdc(10),
  },
};
export const MAX_ONRAMP_AMOUNT: any = {
  "venmo": {
    "localhost": usdc(999),
    "goerli": usdc(999),
    "sepolia": usdc(999),
    "base": usdc(500),
    "base_staging": usdc(999),
  },
  "hdfc": {
    "localhost": usdc(998),
    "goerli": usdc(999),
    "sepolia": usdc(999),
    "base": usdc(100),
    "base_staging": usdc(100),
  },
  "garanti": {
    "localhost": usdc(998),
    "goerli": usdc(999),
    "sepolia": usdc(999),
    "base": usdc(100),
    "base_staging": usdc(100),
  },
  "wise": {
    "localhost": usdc(998),
    "goerli": usdc(999),
    "sepolia": usdc(999),
    "base": usdc(200),
    "base_staging": usdc(200),
  },
  "revolut": {
    "localhost": usdc(22),
    "goerli": usdc(20),
    "sepolia": usdc(20),
    "base": usdc(250),
    "base_staging": usdc(10),
  },
};
export const INTENT_EXPIRATION_PERIOD: any = {
  "venmo": {
    "localhost": ONE_DAY_IN_SECONDS,
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS,
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "hdfc": {
    "localhost": ONE_DAY_IN_SECONDS.sub(1),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS,
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "garanti": {
    "localhost": ONE_DAY_IN_SECONDS.sub(2),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS,
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "wise": {
    "localhost": ONE_DAY_IN_SECONDS.sub(2),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS,
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "revolut": {
    "localhost": ONE_DAY_IN_SECONDS.sub(3),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS,
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
};
export const ONRAMP_COOL_DOWN_PERIOD: any = {
  "venmo": {
    "localhost": THREE_MINUTES_IN_SECONDS,
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS.div(2),
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "hdfc": {
    "localhost": THREE_MINUTES_IN_SECONDS.sub(1),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS.div(2),
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "garanti": {
    "localhost": THREE_MINUTES_IN_SECONDS.sub(2),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS.div(2),
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "wise": {
    "localhost": THREE_MINUTES_IN_SECONDS.sub(2),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS.div(2),
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
  "revolut": {
    "localhost": THREE_MINUTES_IN_SECONDS.sub(3),
    "goerli": THREE_MINUTES_IN_SECONDS,
    "sepolia": THREE_MINUTES_IN_SECONDS,
    "base": ONE_DAY_IN_SECONDS.div(2),
    "base_staging": THREE_MINUTES_IN_SECONDS,
  },
};
export const SUSTAINABILITY_FEE: any = {
  "venmo": {
    "localhost": ether(.001),
    "goerli": ether(.001),
    "sepolia": ether(.001),
    "base": ZERO,
    "base_staging": ZERO,
  },
  "hdfc": {
    "localhost": ether(.002),
    "goerli": ether(.001),
    "sepolia": ether(.001),
    "base": ZERO,
    "base_staging": ZERO,
  },
  "garanti": {
    "localhost": ether(.002),
    "goerli": ether(.001),
    "sepolia": ether(.001),
    "base": ZERO,
    "base_staging": ZERO,
  },
  "wise": {
    "localhost": ether(.002),
    "goerli": ether(.001),
    "sepolia": ether(.001),
    "base": ZERO,
    "base_staging": ZERO,
  },
  "revolut": {
    "localhost": ether(.003),
    "goerli": ether(.001),
    "sepolia": ether(.001),
    "base": ZERO,
    "base_staging": ZERO,
  },
};
export const SUSTAINABILITY_FEE_RECIPIENT: any = {
  "venmo": {
    "localhost": "",
    "goerli": "",
    "sepolia": "",
    "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
    "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
  },
  "hdfc": {
    "localhost": "",
    "goerli": "",
    "sepolia": "",
    "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
    "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
  },
  "garanti": {
    "localhost": "",
    "goerli": "",
    "sepolia": "",
    "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
    "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
  },
  "wise": {
    "localhost": "",
    "goerli": "",
    "sepolia": "",
    "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
    "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
  },
  "revolut": {
    "localhost": "",
    "goerli": "",
    "sepolia": "",
    "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
    "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
  },
};

// Global Parameters
export const MULTI_SIG: any = {
  "localhost": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "goerli": "",
  "sepolia": "",
  "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
  "base_staging": "0xdd93E0f5fC32c86A568d87Cb4f08598f55E980F3",
};

// USDC
export const USDC: any = {
  "base": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "base_staging": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

// For Goerli and localhost
export const USDC_MINT_AMOUNT = usdc(1000000);
export const USDC_RECIPIENT = "0x1d2033DC6720e3eCC14aBB8C2349C7ED77E831ad";
