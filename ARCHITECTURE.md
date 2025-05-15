# UK Tax Calculator - Architecture

## Overview

This application is a UK Tax Calculator built with Angular 19. It allows users to calculate income tax based on UK tax bands and view the tax band information.

## Technical Stack

- **Framework**: Angular 19
- **Styling**: CSS with BEM methodology
- **Routing**: Angular Router

## Application Structure

The application follows a component-based architecture with standalone components:

## Components

### App Component

The root component that serves as the application shell. It includes the navbar and a router outlet for displaying the active route's component.

### Navbar Component

A standalone component that provides navigation between different sections of the application.

### Calculator Component

Implements the tax calculator functionality, allowing users to input their gross annual salary and view the calculated tax results.

### Tax Bands Component

Displays the UK tax bands information in a tabular format.

## Styling Approach

The application uses the Block Element Modifier (BEM) methodology for CSS class naming:

- **Block**: Represents a standalone component (e.g., `.calculator`, `.tax-bands`, `.navbar`)
- **Element**: Parts of a block, denoted by double underscores (e.g., `.calculator__input`, `.navbar__link`)
- **Modifier**: Variations of a block or element, denoted by double hyphens (e.g., `.navbar__link--active`)

Each component has its own CSS file with styles that only apply to that component, promoting style encapsulation and preventing style leakage.

## Routing

The application uses Angular Router with the following routes:

- `/`: Redirects to the calculator page
- `/calculator`: Displays the tax calculator
- `/tax-bands`: Displays the tax bands information

## Tax Calculation Logic

The tax calculation is based on the UK tax bands:

- Band A: 0-5000 at 0%
- Band B: 5000-20000 at 20%
- Band C: 20000+ at 40%

The calculator computes:
- Gross annual and monthly salary
- Net annual and monthly salary
- Annual and monthly tax paid

## Future Enhancements

Potential future enhancements could include:

- Ability to customize tax bands
- Support for different tax years
- Additional tax calculations (e.g., National Insurance)
- Data persistence
