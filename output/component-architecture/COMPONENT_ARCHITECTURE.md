# Component Architecture

**Generated**: 2026-02-05T01:54:01.584Z

This document defines the component hierarchy using Atomic Design principles.

## Component Structure


## Atoms

### Button

Basic button component with variants

**Props:**
- `variant` (optional): Visual style variant
- `size` (optional): Button size
- `disabled` (optional): Disabled state
- `onClick` (optional): Click handler
- `children` (required): Button content

**Variants:** primary, secondary, outline

**Usage:** CTAs, Form submissions, Navigation

---

### Input

Text input field

**Props:**
- `type` (optional): Input type
- `placeholder` (optional): Placeholder text
- `value` (optional): Controlled value
- `onChange` (optional): Change handler
- `required` (optional): Required field

**Usage:** Forms, Search, User input

---

### Text

Typography component

**Props:**
- `variant` (optional): Text style
- `color` (optional): Text color
- `align` (optional): Text alignment
- `children` (required): Text content

**Variants:** h1, h2, h3, body, caption

**Usage:** Headings, Body text, Labels

---

### Icon

SVG icon component

**Props:**
- `name` (required): Icon identifier
- `size` (optional): Icon size in pixels
- `color` (optional): Icon color

**Usage:** Navigation, Actions, Status indicators

---


## Molecules

### FormField

Input with label and validation

**Props:**
- `label` (required): Field label
- `error` (optional): Validation error message
- `required` (optional): Required field
- `children` (required): Input element

**Dependencies:** Text, Input

**Usage:** Contact forms, User registration

---

### Card

Content card with image and text

**Props:**
- `image` (optional): Card image URL
- `title` (required): Card title
- `description` (optional): Card description
- `action` (optional): CTA button

**Dependencies:** Text, Button

**Usage:** Service cards, Project cards, Team members

---

### NavLink

Navigation link with active state

**Props:**
- `href` (required): Link destination
- `active` (optional): Active state
- `children` (required): Link text

**Dependencies:** Text

**Usage:** Main navigation, Footer links

---


## Organisms

### Header

Site header with navigation

**Props:**
- `logo` (optional): Logo image URL
- `navigation` (required): Navigation items
- `actions` (optional): Header actions

**Dependencies:** NavLink, Button

**Usage:** Site header

---

### Footer

Site footer with links and info

**Props:**
- `links` (required): Footer links
- `social` (optional): Social media links
- `copyright` (optional): Copyright text

**Dependencies:** NavLink, Icon

**Usage:** Site footer

---

### Hero

Hero section with CTA

**Props:**
- `title` (required): Hero title
- `subtitle` (optional): Hero subtitle
- `image` (optional): Background image
- `cta` (optional): Call to action

**Dependencies:** Text, Button

**Usage:** Homepage, Landing pages

---

### ContactForm

Multi-field contact form

**Props:**
- `onSubmit` (required): Form submission handler
- `loading` (optional): Loading state

**Dependencies:** FormField, Button

**Usage:** Contact page, Quote requests

---

### ServiceGrid

Grid of service cards

**Props:**
- `services` (required): Services to display
- `columns` (optional): Grid columns

**Dependencies:** Card

**Usage:** Services page

---


## Templates

### PageLayout

Base page template

**Props:**
- `children` (required): Page content
- `title` (optional): Page title

**Dependencies:** Header, Footer

**Usage:** All pages

---

### ServicePage

Service detail page template

**Props:**
- `service` (required): Service data

**Dependencies:** PageLayout, Hero, ServiceGrid

**Usage:** Individual service pages

---

