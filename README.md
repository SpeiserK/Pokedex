# Pokedex

A simple mobile application developped using React Native with Typescript. Made for Android.

## Overview

This app acts as a portable Pokedex such that you can retrieve detailed information on any Pokemon.

## Screens

### List View

Displays a list of Pokemon, starting at 50. Each Pokemon display a picture, their name, and Pokemon number. Click on any Pokemon to view its details.

When scrolled to the bottom of the list, the next 50 Pokemon will load after the current 50 creating an infinite scroll effect.

![image info](./images/PokeListView.png)

### Details View

Displays the details of a selected Pokemon from the List View. This screen shows the name, type(s), height, weight, and moves that the Pokemon can learn.

![image info](./images/PokeDetailsView.png)

![image info](./images/PokeDetailsView2.png)

## Application Requirements

Node version 18 or newer

```
brew install node
```

Watchman

```
brew install watchman
```

Java Development Kit, version 17 recommended

```
brew install --cask zulu@17
```

### Toolkits

RTK Query

```
npm install @reduxjs/toolkit
npm install react-redux
```

React Navigation

```
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-content
```
