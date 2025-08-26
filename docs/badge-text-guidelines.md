# Badge Text Guidelines

## Recommended Badge Text Length

### ✅ **Good Badge Text (2-15 characters)**
- "New"
- "Beta" 
- "Pro"
- "Premium"
- "Active"
- "Pending"
- "Complete"
- "Draft"
- "Published"
- "Archived"

### ✅ **Acceptable Badge Text (15-25 characters)**
- "In Progress"
- "Under Review"
- "Needs Approval"
- "Ready to Ship"
- "Zero Config"
- "Type Safe"
- "Production Ready"

### ⚠️ **Long Badge Text (25-40 characters)**
- "Hybrid Integration" (18 chars) ✅
- "WCAG AA Compliant" (17 chars) ✅
- "TypeScript Support" (18 chars) ✅
- "Mobile Responsive Design" (24 chars) ⚠️

### ❌ **Too Long for Badges (40+ characters)**
- "Hybrid Tailwind Approach + Zero-Config Integration" (50 chars) ❌
- "Production-Ready Components with Full Type Safety" (49 chars) ❌
- "Comprehensive Design System with Accessibility" (46 chars) ❌

## Badge Text Alternatives

### Instead of: "Hybrid Tailwind Approach + Zero-Config Integration"
**Use one of:**
- "Hybrid Integration" ✅
- "Dual Integration" ✅
- "Flexible Setup" ✅
- "Multi-Mode" ✅

### Instead of: "Production-Ready Components with Full Type Safety"
**Use one of:**
- "Production Ready" ✅
- "Type Safe" ✅
- "Enterprise Ready" ✅
- "Battle Tested" ✅

### Instead of: "Comprehensive Design System with Accessibility"
**Use one of:**
- "Design System" ✅
- "WCAG Compliant" ✅
- "Accessible" ✅
- "A11y Ready" ✅

## Context-Specific Recommendations

### **Hero Section Badge**
```tsx
// ❌ Too long
<Badge>Hybrid Tailwind Approach + Zero-Config Integration</Badge>

// ✅ Perfect
<Badge>Hybrid Integration</Badge>
<Badge>Dual Setup</Badge>
<Badge>Flexible Config</Badge>
```

### **Feature Badges**
```tsx
// ✅ Great for features
<Badge variant="success">Type Safe</Badge>
<Badge variant="primary">Zero Config</Badge>
<Badge variant="warning">Beta</Badge>
<Badge variant="danger">Deprecated</Badge>
```

### **Status Badges**
```tsx
// ✅ Perfect for status
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="default">Draft</Badge>
```

### **Category Badges**
```tsx
// ✅ Good for categorization
<Badge>Frontend</Badge>
<Badge>Backend</Badge>
<Badge>DevOps</Badge>
<Badge>Design</Badge>
```

## Technical Constraints

### **Badge Max-Width by Size:**
- **Small**: 8-10rem (128-160px)
- **Medium**: 10-12rem (160-192px)  
- **Large**: 12-16rem (192-256px)

### **Character Limits by Size:**
- **Small**: ~12-15 characters
- **Medium**: ~15-20 characters
- **Large**: ~20-25 characters

### **With Remove Button:**
- Reduces available space by ~2rem (32px)
- Use shorter text when removable

## Best Practices

### ✅ **Do:**
- Keep text concise and meaningful
- Use abbreviations when appropriate ("A11y" for "Accessibility")
- Consider the context where the badge appears
- Test at different screen sizes
- Use title attribute for full text on hover

### ❌ **Don't:**
- Use full sentences in badges
- Include multiple concepts in one badge
- Use technical jargon without context
- Forget about mobile users
- Ignore truncation behavior

## Examples in Context

### **Component Library Demo:**
```tsx
// Hero section
<Badge variant="primary">Hybrid Integration</Badge>

// Feature highlights  
<Badge variant="success">Type Safe</Badge>
<Badge variant="success">Zero Config</Badge>
<Badge variant="success">WCAG AA</Badge>

// Status indicators
<Badge variant="warning">Beta</Badge>
<Badge variant="success">Stable</Badge>
<Badge variant="danger">Deprecated</Badge>
```

### **Dashboard/Admin:**
```tsx
// User status
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Suspended</Badge>

// Content status
<Badge variant="default">Draft</Badge>
<Badge variant="primary">Published</Badge>
<Badge variant="warning">Under Review</Badge>
```

Remember: **Badges are for quick visual identification, not detailed descriptions!**
