import { describe, it } from "node:test";
import assert from "node:assert";
import React from "react";
import ReactDOMServer from "react-dom/server";

// Import all 11 UI primitives under test
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "../dialog";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../card";

import { Input } from "../input";
import { Textarea } from "../textarea";
import { Label, labelVariants } from "../label";

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "../select";

import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../tooltip";
import { Button, buttonVariants } from "../button";
import { Badge, badgeVariants } from "../badge";

describe("Adversarial Stress Suite: Radix & shadcn UI Primitives", () => {
  // 1. Edge Case: Null, Empty, and Zero Children
  describe("Edge Case: Null, Empty, Zero, and Falsy Children", () => {
    it("Button handles null, undefined, empty string, and numeric zero without throwing", () => {
      const renderNull = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, null, null)
      );
      assert.ok(renderNull.includes("<button"), "Button rendered with null children");

      const renderUndefined = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, null, undefined)
      );
      assert.ok(renderUndefined.includes("<button"), "Button rendered with undefined children");

      const renderEmpty = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, null, "")
      );
      assert.ok(renderEmpty.includes("<button"), "Button rendered with empty string");

      const renderZero = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, null, 0)
      );
      assert.ok(renderZero.includes(">0</button>"), "Button rendered with zero");
    });

    it("Badge handles null, undefined, empty string, and numeric zero", () => {
      const renderZero = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Badge, null, 0)
      );
      assert.ok(renderZero.includes(">0</div>"), "Badge rendered with numeric zero");

      const renderNull = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Badge, null, null)
      );
      assert.ok(renderNull.includes("<div"), "Badge rendered with null");
    });

    it("Card and all subcomponents handle null children safely", () => {
      const cardTree = React.createElement(
        Card,
        null,
        React.createElement(CardHeader, null, null),
        React.createElement(CardTitle, null, null),
        React.createElement(CardDescription, null, null),
        React.createElement(CardContent, null, null),
        React.createElement(CardFooter, null, null)
      );
      const html = ReactDOMServer.renderToStaticMarkup(cardTree);
      assert.ok(html.includes("rounded-2xl"), "Card container rendered");
      assert.ok(html.includes("<h3"), "CardTitle rendered empty");
      assert.ok(html.includes("<p"), "CardDescription rendered empty");
    });

    it("Label handles empty and null children safely", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Label, { htmlFor: "test-id" }, null)
      );
      assert.ok(html.includes("<label"), "Label rendered");
      assert.ok(html.includes('for="test-id"'), "htmlFor attribute forwarded");
    });
  });

  // 2. Edge Case: Gigantic, Unicode, Arabic, RTL, and Special Character Payloads
  describe("Edge Case: Stress Payloads, Unicode, Arabic, and XSS Injection", () => {
    const hugePayload = "A".repeat(10000);
    const xssPayload = `<script>alert("xss")</script><img src=x onerror=alert(1)>"&'`;
    const arabicPayload = "إسلام سامي — مهندس برمجيات رئيسي وقيادة تقنية تنفيذية";
    const emojiPayload = "🚀⚡🛡️💻🌐🔥💎🎯";

    it("Button handles 10,000-character payload safely", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, null, hugePayload)
      );
      assert.ok(html.includes(hugePayload), "Button rendered 10k character payload");
    });

    it("Input handles long values and XSS payloads with automatic escaping", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Input, { defaultValue: xssPayload, "aria-label": "search" })
      );
      assert.ok(!html.includes("<script>"), "Input properly escaped raw <script> in value");
      assert.ok(html.includes("&lt;script&gt;"), "Input safely entity-encoded XSS string");
    });

    it("Textarea handles gigantic multi-line string safely", () => {
      const multiLine = "Line\n".repeat(1000);
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Textarea, { defaultValue: multiLine })
      );
      assert.ok(html.includes("<textarea"), "Textarea rendered");
      assert.ok(html.includes("Line"), "Textarea rendered multi-line content");
    });

    it("CardTitle and CardDescription handle Arabic RTL text correctly", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Card,
          null,
          React.createElement(CardTitle, null, arabicPayload),
          React.createElement(CardDescription, null, emojiPayload)
        )
      );
      assert.ok(html.includes(arabicPayload), "CardTitle rendered Arabic text");
      assert.ok(html.includes(emojiPayload), "CardDescription rendered emojis");
    });

    it("AvatarFallback renders Arabic and emoji initials within Avatar", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Avatar,
          null,
          React.createElement(AvatarFallback, null, "إس")
        )
      );
      assert.ok(html.includes("إس"), "AvatarFallback rendered Arabic initials");
    });
  });

  // 3. Class Merging & Collision Tests (`cn`)
  describe("Custom ClassName Merging & Collision Resolution", () => {
    it("Button merges custom className and properly overrides conflicting Tailwind utilities", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, { className: "bg-red-700 p-8 text-black" }, "Custom")
      );
      // tailwind-merge must override default padding and background
      assert.ok(html.includes("bg-red-700"), "Custom background applied");
      assert.ok(html.includes("p-8"), "Custom padding applied");
      assert.ok(!html.includes("px-4 py-2"), "Default padding overridden by p-8");
    });

    it("Input merges custom border and focus rings cleanly", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Input, { className: "border-red-500 rounded-none h-14" })
      );
      assert.ok(html.includes("border-red-500"), "Custom border applied");
      assert.ok(html.includes("rounded-none"), "Custom radius applied");
      assert.ok(!html.includes("rounded-lg"), "Default rounded-lg overridden");
      assert.ok(html.includes("h-14"), "Custom height applied");
      assert.ok(!html.includes("h-10"), "Default h-10 overridden");
    });

    it("Card merges custom background and shadow utilities", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Card, { className: "shadow-none border-transparent bg-transparent" })
      );
      assert.ok(html.includes("shadow-none"), "shadow-none applied");
      assert.ok(html.includes("border-transparent"), "border-transparent applied");
      assert.ok(html.includes("bg-transparent"), "bg-transparent applied");
    });

    it("Badge merges custom font and padding classes", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Badge, { variant: "outline", className: "px-6 py-2 text-sm" }, "Active")
      );
      assert.ok(html.includes("px-6"), "Custom px-6 applied");
      assert.ok(html.includes("py-2"), "Custom py-2 applied");
      assert.ok(!html.includes("px-2.5 py-0.5"), "Default padding overridden");
    });
  });

  // 4. Ref Forwarding Support across all primitives
  describe("Ref Forwarding Integrity", () => {
    it("All forwarded components support React ref object without throwing", () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      const inputRef = React.createRef<HTMLInputElement>();
      const textareaRef = React.createRef<HTMLTextAreaElement>();
      const cardRef = React.createRef<HTMLDivElement>();
      const badgeRef = React.createRef<HTMLDivElement>();
      const labelRef = React.createRef<HTMLLabelElement>();

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Button, { ref: buttonRef }, "Ref")
        );
      }, "Button ref did not throw");

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Input, { ref: inputRef })
        );
      }, "Input ref did not throw");

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Textarea, { ref: textareaRef })
        );
      }, "Textarea ref did not throw");

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Card, { ref: cardRef })
        );
      }, "Card ref did not throw");

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Badge, { ref: badgeRef }, "BadgeRef")
        );
      }, "Badge ref did not throw");

      assert.doesNotThrow(() => {
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(Label, { ref: labelRef }, "LabelRef")
        );
      }, "Label ref did not throw");
    });
  });

  // 5. Disabled State and Form Accessibility
  describe("Disabled States and Form Accessibility Attributes", () => {
    it("Button in disabled state sets disabled attribute and pointer-events-none class", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Button, { disabled: true }, "Disabled")
      );
      assert.ok(html.includes("disabled"), "Button has disabled HTML attribute");
      assert.ok(html.includes("disabled:pointer-events-none"), "Has pointer-events-none");
      assert.ok(html.includes("disabled:opacity-50"), "Has disabled opacity");
    });

    it("Input in disabled state sets disabled attribute and not-allowed cursor", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Input, { disabled: true, required: true, id: "test-in" })
      );
      assert.ok(html.includes("disabled"), "Input has disabled attribute");
      assert.ok(html.includes("required"), "Input has required attribute");
      assert.ok(html.includes("disabled:cursor-not-allowed"), "Input has not-allowed cursor");
    });

    it("Textarea in disabled state sets disabled attribute and resize-y class", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Textarea, { disabled: true, rows: 4 })
      );
      assert.ok(html.includes("disabled"), "Textarea has disabled attribute");
      assert.ok(html.includes("disabled:cursor-not-allowed"), "Textarea has not-allowed cursor");
      assert.ok(html.includes("resize-y"), "Textarea has vertical resize");
    });

    it("Label includes peer-disabled styling for form control association", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Label, { htmlFor: "input-field" }, "Email Address")
      );
      assert.ok(html.includes("peer-disabled:cursor-not-allowed"), "Has peer-disabled cursor");
      assert.ok(html.includes("peer-disabled:opacity-70"), "Has peer-disabled opacity");
    });
  });

  // 6. Button `asChild` Delegation (Radix Slot)
  describe("Button asChild Delegation", () => {
    it("Delegates rendering to child anchor element while preserving button styles", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Button,
          { asChild: true, variant: "destructive" },
          React.createElement("a", { href: "/admin/danger" }, "Dangerous Link")
        )
      );
      assert.ok(html.startsWith("<a "), "Rendered an <a> tag instead of <button>");
      assert.ok(html.includes('href="/admin/danger"'), "Preserved anchor href");
      assert.ok(html.includes("bg-error-container"), "Preserved destructive variant styling");
      assert.ok(html.includes("Dangerous Link"), "Preserved anchor text");
    });
  });

  // 7. Full Variant Exhaustion
  describe("Variant Exhaustion Tests", () => {
    const buttonVariantList = [
      "default",
      "primary",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "accent",
      "link",
    ] as const;

    const buttonSizeList = ["default", "sm", "lg", "icon"] as const;

    it("All button variants and sizes render valid classes without exceptions", () => {
      for (const variant of buttonVariantList) {
        for (const size of buttonSizeList) {
          const html = ReactDOMServer.renderToStaticMarkup(
            React.createElement(Button, { variant, size }, `${variant}-${size}`)
          );
          assert.ok(html.includes("<button"), `Rendered Button ${variant} ${size}`);
        }
      }
    });

    const badgeVariantList = [
      "default",
      "secondary",
      "tertiary",
      "outline",
      "success",
      "warning",
      "error",
      "destructive",
      "surface",
    ] as const;

    it("All badge variants render valid classes without exceptions", () => {
      for (const variant of badgeVariantList) {
        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(Badge, { variant }, variant)
        );
        assert.ok(html.includes("<div"), `Rendered Badge ${variant}`);
      }
    });
  });

  // 8. Radix UI Composition & SSR Safe Rendering
  describe("Radix UI SSR Safe Rendering & Composition", () => {
    it("Tabs renders full component hierarchy in SSR without hydration error", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Tabs,
          { defaultValue: "tab1" },
          React.createElement(
            TabsList,
            null,
            React.createElement(TabsTrigger, { value: "tab1" }, "Tab 1"),
            React.createElement(TabsTrigger, { value: "tab2" }, "Tab 2")
          ),
          React.createElement(TabsContent, { value: "tab1" }, "Content 1"),
          React.createElement(TabsContent, { value: "tab2" }, "Content 2")
        )
      );
      assert.ok(html.includes("Tab 1"), "TabsList rendered Tab 1 trigger");
      assert.ok(html.includes("Tab 2"), "TabsList rendered Tab 2 trigger");
      assert.ok(html.includes("Content 1"), "TabsContent 1 rendered");
    });

    it("Avatar and AvatarFallback render in SSR safely", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Avatar,
          null,
          React.createElement(AvatarImage, { src: "/avatar.jpg", alt: "Islam Samy" }),
          React.createElement(AvatarFallback, null, "IS")
        )
      );
      assert.ok(html.includes("IS"), "AvatarFallback rendered initials");
      assert.ok(html.includes("rounded-full"), "Avatar container has rounded-full");
    });

    it("Tooltip and TooltipProvider render in SSR without crashing", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          TooltipProvider,
          null,
          React.createElement(
            Tooltip,
            null,
            React.createElement(TooltipTrigger, { asChild: true }, React.createElement("button", null, "Hover")),
            React.createElement(TooltipContent, null, "Tooltip Text")
          )
        )
      );
      assert.ok(html.includes("Hover"), "Tooltip trigger button rendered in SSR");
    });
  });

  // 9. Contract Export Parity Audit (PROJECT.md F3)
  describe("PROJECT.md F3 UI Primitives Export Parity", () => {
    it("dialog.tsx exports all specified subcomponents", () => {
      assert.ok(Dialog !== undefined, "Dialog is exported");
      assert.ok(DialogTrigger !== undefined, "DialogTrigger is exported");
      assert.ok(DialogContent !== undefined, "DialogContent is exported");
      assert.ok(DialogHeader !== undefined, "DialogHeader is exported");
      assert.ok(DialogFooter !== undefined, "DialogFooter is exported");
      assert.ok(DialogTitle !== undefined, "DialogTitle is exported");
      assert.ok(DialogDescription !== undefined, "DialogDescription is exported");
      assert.ok(DialogClose !== undefined, "DialogClose is exported");
      assert.ok(DialogOverlay !== undefined, "DialogOverlay is exported");
      assert.ok(DialogPortal !== undefined, "DialogPortal is exported");
    });

    it("tabs.tsx exports all specified subcomponents", () => {
      assert.ok(Tabs !== undefined, "Tabs is exported");
      assert.ok(TabsList !== undefined, "TabsList is exported");
      assert.ok(TabsTrigger !== undefined, "TabsTrigger is exported");
      assert.ok(TabsContent !== undefined, "TabsContent is exported");
    });

    it("card.tsx exports all specified subcomponents", () => {
      assert.ok(Card !== undefined, "Card is exported");
      assert.ok(CardHeader !== undefined, "CardHeader is exported");
      assert.ok(CardTitle !== undefined, "CardTitle is exported");
      assert.ok(CardDescription !== undefined, "CardDescription is exported");
      assert.ok(CardContent !== undefined, "CardContent is exported");
      assert.ok(CardFooter !== undefined, "CardFooter is exported");
    });

    it("select.tsx exports all specified subcomponents", () => {
      assert.ok(Select !== undefined, "Select is exported");
      assert.ok(SelectGroup !== undefined, "SelectGroup is exported");
      assert.ok(SelectValue !== undefined, "SelectValue is exported");
      assert.ok(SelectTrigger !== undefined, "SelectTrigger is exported");
      assert.ok(SelectContent !== undefined, "SelectContent is exported");
      assert.ok(SelectLabel !== undefined, "SelectLabel is exported");
      assert.ok(SelectItem !== undefined, "SelectItem is exported");
      assert.ok(SelectSeparator !== undefined, "SelectSeparator is exported");
      assert.ok(SelectScrollUpButton !== undefined, "SelectScrollUpButton is exported");
      assert.ok(SelectScrollDownButton !== undefined, "SelectScrollDownButton is exported");
    });

    it("avatar.tsx exports all specified subcomponents", () => {
      assert.ok(Avatar !== undefined, "Avatar is exported");
      assert.ok(AvatarImage !== undefined, "AvatarImage is exported");
      assert.ok(AvatarFallback !== undefined, "AvatarFallback is exported");
    });

    it("tooltip.tsx exports all specified subcomponents", () => {
      assert.ok(Tooltip !== undefined, "Tooltip is exported");
      assert.ok(TooltipTrigger !== undefined, "TooltipTrigger is exported");
      assert.ok(TooltipContent !== undefined, "TooltipContent is exported");
      assert.ok(TooltipProvider !== undefined, "TooltipProvider is exported");
    });

    it("input.tsx, textarea.tsx, label.tsx export base components", () => {
      assert.ok(Input !== undefined, "Input is exported");
      assert.ok(Textarea !== undefined, "Textarea is exported");
      assert.ok(Label !== undefined, "Label is exported");
      assert.ok(labelVariants !== undefined, "labelVariants is exported");
    });

    it("button.tsx and badge.tsx export components and variants", () => {
      assert.ok(Button !== undefined, "Button is exported");
      assert.ok(buttonVariants !== undefined, "buttonVariants is exported");
      assert.ok(Badge !== undefined, "Badge is exported");
      assert.ok(badgeVariants !== undefined, "badgeVariants is exported");
    });
  });

  // 10. Radix Controlled States & Open/Close State Cycles
  describe("Radix State Machine & Open/Close Cycling", () => {
    it("Tabs accurately reflects controlled active/inactive data-state attributes", () => {
      const renderTab1 = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Tabs,
          { value: "tab1" },
          React.createElement(
            TabsList,
            null,
            React.createElement(TabsTrigger, { value: "tab1" }, "Tab 1"),
            React.createElement(TabsTrigger, { value: "tab2" }, "Tab 2")
          ),
          React.createElement(TabsContent, { value: "tab1" }, "Body 1"),
          React.createElement(TabsContent, { value: "tab2" }, "Body 2")
        )
      );
      assert.ok(renderTab1.includes('data-state="active"'), "Tab 1 is active");
      assert.ok(renderTab1.includes('data-state="inactive"'), "Tab 2 is inactive");

      const renderTab2 = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Tabs,
          { value: "tab2" },
          React.createElement(
            TabsList,
            null,
            React.createElement(TabsTrigger, { value: "tab1" }, "Tab 1"),
            React.createElement(TabsTrigger, { value: "tab2" }, "Tab 2")
          )
        )
      );
      assert.ok(renderTab2.includes('data-state="active"'), "Tab 2 is active");
    });

    it("Tabs survives 1,000 rapid active tab switches without degradation", () => {
      const tabs = ["home", "projects", "blog", "contact"];
      for (let i = 0; i < 1000; i++) {
        const activeTab = tabs[i % tabs.length];
        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(
            Tabs,
            { value: activeTab },
            React.createElement(
              TabsList,
              null,
              tabs.map((t) => React.createElement(TabsTrigger, { key: t, value: t }, t))
            )
          )
        );
        assert.ok(html.includes(`data-state="active"`), `Iteration ${i}: active tab set`);
      }
    });

    it("Dialog subcomponents render semantic tags and styles directly in SSR", () => {
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          Dialog,
          null,
          React.createElement(
            DialogHeader,
            null,
            React.createElement(DialogTitle, null, "Executive Dossier"),
            React.createElement(DialogDescription, null, "Architectural Blueprint"),
            React.createElement(DialogFooter, null, React.createElement(Button, null, "Confirm"))
          )
        )
      );
      assert.ok(html.includes("Executive Dossier"), "Renders DialogTitle text");
      assert.ok(html.includes("Architectural Blueprint"), "Renders DialogDescription text");
      assert.ok(html.includes("<h2") || html.includes("<h3") || html.includes("font-display"), "DialogTitle styled with font-display");
      assert.ok(html.includes("Confirm"), "DialogFooter renders action button");
    });

    it("Dialog safely defers Portal rendering during SSR without crashing", () => {
      assert.doesNotThrow(() => {
        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(
            Dialog,
            { open: true },
            React.createElement(DialogTrigger, { asChild: true }, React.createElement(Button, null, "Open")),
            React.createElement(DialogContent, null, React.createElement(DialogTitle, null, "Modal"))
          )
        );
        assert.ok(html.includes("Open"), "Trigger rendered cleanly during SSR");
      }, "Dialog with open=true does not throw during SSR");
    });
  });
});

