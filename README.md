# Gaadroo
NFPs & NFTs minting protocol on top of Bitcoin, Litecoin & Dogecoin blockchains.

# Quick description
This is Second layer (L2) protocol that uses common L1 blockchains and their programming abilities to create Non-fungible Tokens or real world Pieces.

# Blockchains connection
Chain(.)so is used

# Structure
The ground for the protocol is JSONs schemes which define network rules. Any change in that schemes requires particular release and community consensus. So each different GaadRoo protocol release is called GPR with version postfix (e.g. GPR1.0).

GPR1.0 Introduction

Artist -> Product -> Piece

Artist pattern
name/url/desc/founder
e.g.(nGaadRoo/ugaadroo.com/dNFPMintingCompany/fViktorOgorodnov)

Product pattern
version:item/size/weight/usage/desc/color1/color2/color3/color4/material1/mmaterial2/material3/material4/supply
e.g.(p1:Cap/m/m/Cloth/NFPCap/Black/White/Orange/n/Denim/Plastic/Metal/n/3), p1 => Product structure version 1

Piece pattern
version:md5(sha256(sha256(artistRegTX) + sha256(productRegTX) + sha256(NFPAddress)))/unixtime/lifetime/minCost/number
e.g.(i1:5ebba71e6e16ebc52149525b66cd7a1b/1641171600/86400/100000/1), i1 => Item structure version 1
