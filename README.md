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
<details >
  <summary>Wallet's user is **NOT** connect 👇</summary>
   <br>

   When the user clicks "connect to metamask", his metamask opens a login session.

![screen-wallet-not-connected.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/B077CE31-C043-46BF-8A17-0FD5B2674894_2/9hJqGGPD0dRusSpL9HWQWs0ap5Qfro62ZEDLe6sCZm4z/screen-wallet-not-connected.png)
</details>


<details>
<summary>Wallet's user is connected</summary>

- The user connected is the owner (address who deployed the smart

![screen-owner-homepage.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/B8005410-5485-4AF6-AC0C-ED8DFE5F1DCA_2/VGjMwYml0vTTKNxmEXBbPzV1PrYfi5H76Ji5ivLTzncz/screen-owner-homepage.png)

![screen-owner-menu.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/8E741402-ADD1-45DF-9E6E-2BB48DDE1FA3_2/V2sxypDRZL0RfrR0tILLeiacWiXmyhF6Ofqv2eCpBiUz/screen-owner-menu.png)
<br><br>

- The user is NOT yet a voter

![screen-user-isnot-voter.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/A44ACB7B-FA6C-4E1D-B7FE-444577978F3A_2/yJnc7A11cJENENZj3EtfSd4MfiYotpJySgAu4vNZELIz/screen-user-isnot-voter.png)
<br><br>

- The user is a voter

![screen-voter.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/81800D23-B8C7-48B8-A3B5-F959FF2E752C_2/Eio7K1MGZtnNEScQlyCbCTaWoygGX0ZUlbZ0I89ENrMz/screen-voter.png)

</details>

<details>
   <summary> Search, reset search, input, add, and remove voter functionality</summary>

https://user-images.githubusercontent.com/72397342/165349899-eb63180b-b2a5-4324-9a36-27c796dc7272.mov

</details>


<details>
   <summary> Dynamic page based if user is owner or not</summary>

If the user is not admin this user can only access to search functionality

https://user-images.githubusercontent.com/72397342/165350057-a7e8b194-a4ac-4931-aae4-a3d8346c7b71.mov

</details>

<deatils>
   <summary> Go to next status functionality will work the same way for all pages</summary>

![AnimatedImage.gif](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/A1498344-2131-48D5-B762-63DDA877B155_2/zIduCciyuEKxITurSQxfW1PtcMQWBoyXH3y7zVgyTw0z/AnimatedImage.gif)
</details>


### Proposals Registration page

⚠️ From this state the admin can't add a new voter.

https://user-images.githubusercontent.com/72397342/165342260-02ade265-b444-4937-983c-3179b3be0beb.mov




### Voting Session

https://user-images.githubusercontent.com/72397342/165342357-e4ca1aae-971d-426b-a353-4149cf98472e.mov


### Votes Tallied
![Votes Tallied.png](https://res.craft.do/user/full/998e64c6-91b7-ad00-93f1-6e9f160c5db1/doc/80501499-F4C2-4178-B1BC-F1D42D446A6B/913328E9-E970-46B7-9D2A-7EFEB79A1843_2/jQQxzqB9gc2673KLDcAGjmmmWHcmSd0VjU3dcIN0VBEz/Votes%20Tallied.png)

### Reset
https://user-images.githubusercontent.com/72397342/165342395-27902b08-86b4-404b-bcc2-4370898c2a82.mov



