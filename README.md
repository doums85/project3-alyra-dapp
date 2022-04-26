# 2022.04.25

# The Voter DAap

## INTRODUCTION

The Voter DAap is my blockchain developer training project 3 with [**Alyra**](https://alyra.fr/) **🚀**. I had to create a DAap using my smart contract created while [**project 2**](https://github.com/doums85/alyra-project-2). You can watch the [**demo video**](https://www.loom.com/share/5da67a19f94c467cb78f36824c2ceb50) or follow the step-by-step demos below.

### Here is the list of stacks used:

- Next.js
- Styled-components
- web3.js
- solidity
- truffle

---

## PRESENTATION

For this demo I add three acconts on my metamask (admin and two voters).

The voting app will work with differents status:

1. Registering Voters
2. Proposals Registration Started
3. Voting Session Started
4. Votes Tallied
5. Reset

### Home  page

There are 3 cases for this page and the status start automatocally to "Registering Voters"

+ Wallet's user is **NOT** connect 👇

   When the user clicks "connect to metamask", his metamask opens a login session.

![screen-wallet-not-connected.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/B077CE31-C043-46BF-8A17-0FD5B2674894_2/9hJqGGPD0dRusSpL9HWQWs0ap5Qfro62ZEDLe6sCZm4z/screen-wallet-not-connected.png)

+ Wallet's user is connected
   + The user connected is the owner (address who deployed the smart

![screen-owner-homepage.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/B8005410-5485-4AF6-AC0C-ED8DFE5F1DCA_2/VGjMwYml0vTTKNxmEXBbPzV1PrYfi5H76Ji5ivLTzncz/screen-owner-homepage.png)

![screen-owner-menu.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/8E741402-ADD1-45DF-9E6E-2BB48DDE1FA3_2/V2sxypDRZL0RfrR0tILLeiacWiXmyhF6Ofqv2eCpBiUz/screen-owner-menu.png)

   + The user is NOT yet a voter

![screen-user-isnot-voter.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/A44ACB7B-FA6C-4E1D-B7FE-444577978F3A_2/yJnc7A11cJENENZj3EtfSd4MfiYotpJySgAu4vNZELIz/screen-user-isnot-voter.png)

   + The user is a voter

![screen-voter.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/81800D23-B8C7-48B8-A3B5-F959FF2E752C_2/Eio7K1MGZtnNEScQlyCbCTaWoygGX0ZUlbZ0I89ENrMz/screen-voter.png)

+ Search, reset search, input, add, and remove voter functionality

[search-reset-add-remove.mov](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/DE5E7FF5-E1F0-4154-B23C-ACC6D3AD173F_2/LHFYCWnxs4TmHykAHqNb8NDjHfCnY71OehxQysFRaQQz/search-reset-add-remove.mov)

+ Dynamic page based if user is owner or not

   If the user is not admin this user can only access to search functionality

[dynamic-page.mov](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/90F85874-1E01-408D-BB75-E8F99C45CC9F_2/Wn7CgajNIHb7Ke9yycjILxoiH3QvD6Hur6rQSnSYxNAz/dynamic-page.mov)

+ Go to next status functionality will work the same way for all pages

![AnimatedImage.gif](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/A1498344-2131-48D5-B762-63DDA877B155_2/zIduCciyuEKxITurSQxfW1PtcMQWBoyXH3y7zVgyTw0z/AnimatedImage.gif)

### Proposals Registration page

⚠️ From this state the admin can't add a new voter.

[proposal-demo.mov](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/42382810-F45F-4563-8657-0B7821AA3CB0_2/cnazjj3Lyh5jsS8Pqgng9GDgfysvpJyPAayLRcyMXyoz/proposal-demo.mov)

### Voting Session

[voting-demo.mov](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/E6C8C370-9816-4467-A435-99A46CE2E079_2/IJkYDkVEtehqn5CmKWqZYbSgG8cx4vNc20bMEPi1UAwz/voting-demo.mov)

### Votes Tallied

![Votes Tallied.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/913328E9-E970-46B7-9D2A-7EFEB79A1843_2/jQQxzqB9gc2673KLDcAGjmmmWHcmSd0VjU3dcIN0VBEz/Votes%20Tallied.png)

### Reset

[reset.mov](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/02485501-162D-4801-A713-70936A7D7FC5_2/w0yGy8K7xh4vQjVkb3DHdJ0TKJhrsHaym3ZkHDummpYz/reset.mov)

