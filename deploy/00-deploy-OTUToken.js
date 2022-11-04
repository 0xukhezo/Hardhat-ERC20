const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const inicialSupply = 1000;

  log("------------------------------------");

  const OTUToken = await deploy("OTUToken", {
    from: deployer,
    args: [inicialSupply],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
    log("------------------------------------");
    log("Verifying...");
    await verify(OTUToken.address, [inicialSupply]);
  }
};

module.exports.tags = ["all", "OTUToken"];
