import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { CravyoSheetScreen } from "../../components/layout/CravyoSheetScreen";
import { CravyoPillTabs } from "../../components/ui/CravyoPillTabs";
import {
  accountFaqs,
  contactMethods,
  generalFaqs,
  helpOptions,
  serviceFaqs,
  supportChoices,
  supportCurrentOrder,
} from "./mock";
import type { ContactMethod, FaqEntry, HelpCategoryKey } from "./types";

const faqCategories = [
  { key: "general", label: "General" },
  { key: "account", label: "Account" },
  { key: "services", label: "Services" },
] as const;

const faqTopTabs = [
  { key: "faq", label: "FAQ" },
  { key: "contact-us", label: "Contact Us" },
] as const;

const faqsByCategory: Record<HelpCategoryKey, FaqEntry[]> = {
  general: generalFaqs,
  account: accountFaqs,
  services: serviceFaqs,
};

export function HelpScreen() {
  const router = useRouter();

  return (
    <CravyoSheetScreen activeNavKey="support" backHref="/(tabs)" title="Help">
      <Text style={styles.helpDescription}>
        Find answers, get support, and manage order-related questions in one
        place.
      </Text>

      <View style={styles.helpOptionList}>
        {helpOptions.map((option) => (
          <Pressable
            accessibilityRole="button"
            key={option.id}
            onPress={() => router.push(option.href)}
            style={styles.helpOptionRow}
          >
            <View style={styles.helpOptionIcon}>
              <MaterialCommunityIcons
                color="#EA7E3A"
                name={option.iconName}
                size={22}
              />
            </View>

            <View style={styles.helpOptionCopy}>
              <Text style={styles.helpOptionLabel}>{option.label}</Text>
              <Text style={styles.helpOptionText}>{option.description}</Text>
            </View>

            <Feather color="#D99058" name="chevron-right" size={18} />
          </Pressable>
        ))}
      </View>
    </CravyoSheetScreen>
  );
}

export function HelpFaqsScreen() {
  return <FaqHubScreen title="Help & FAQs" />;
}

export function HelpCenterScreen() {
  return <FaqHubScreen title="Help Center" />;
}

export function ContactUsScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <CravyoSheetScreen
      activeNavKey="support"
      backHref="/support"
      subtitle="How can we help you?"
      title="Contact Us"
    >
      <CravyoPillTabs
        activeKey="contact-us"
        items={faqTopTabs}
        onChange={(key) => {
          if (key === "faq") {
            router.replace("/support/help-faqs");
          }
        }}
      />

      <View style={styles.contactList}>
        {contactMethods.map((method) => {
          const expanded = expandedId === method.id;

          return (
            <Pressable
              accessibilityRole="button"
              key={method.id}
              onPress={() =>
                setExpandedId((current) => (current === method.id ? null : method.id))
              }
              style={styles.contactRow}
            >
              <View style={styles.contactRowHeader}>
                <View style={styles.contactRowLeft}>
                  <MaterialCommunityIcons
                    color="#E97B35"
                    name={method.iconName}
                    size={28}
                  />
                  <Text style={styles.contactLabel}>{method.label}</Text>
                </View>
                <Feather color="#D98B57" name="chevron-down" size={18} />
              </View>

              {expanded ? (
                <Text style={styles.contactDetail}>{method.detail}</Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </CravyoSheetScreen>
  );
}

export function SupportChatScreen() {
  return (
    <CravyoSheetScreen activeNavKey="support" backHref="/support" title="Support">
      <View style={styles.supportGreetingBadge}>
        <Text style={styles.supportGreetingText}>Hello!</Text>
      </View>

      <View style={styles.supportMessageBubble}>
        <Text style={styles.supportMessageText}>
          Hello! Please choose the number that matches your needs for faster
          support.
        </Text>
      </View>

      <View style={styles.supportChoicesList}>
        {supportChoices.map((choice) => (
          <Pressable
            accessibilityRole="button"
            key={choice.id}
            style={styles.supportChoice}
          >
            <Text style={styles.supportChoiceLabel}>{choice.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.supportOrderCard}>
        <View style={styles.supportOrderBadge}>
          <MaterialCommunityIcons
            color="#FFFFFF"
            name="clipboard-text-outline"
            size={18}
          />
        </View>

        <Text style={styles.supportOrderEyebrow}>You have a current order</Text>
        <Text style={styles.supportOrderTitle}>{supportCurrentOrder.title}</Text>
        <Text style={styles.supportOrderMeta}>{supportCurrentOrder.orderNumber}</Text>
        <Text style={styles.supportOrderMeta}>{supportCurrentOrder.placedAt}</Text>

        <View style={styles.supportIssueChip}>
          <Text style={styles.supportIssueLabel}>{supportCurrentOrder.issueLabel}</Text>
        </View>
      </View>

      <View style={styles.supportInputShell}>
        <Text style={styles.supportInputPlaceholder}>Write here...</Text>
        <MaterialCommunityIcons color="#EA7C37" name="send-outline" size={18} />
      </View>
    </CravyoSheetScreen>
  );
}

function FaqHubScreen({ title }: { title: string }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<HelpCategoryKey>("general");
  const [searchValue, setSearchValue] = useState("");
  const [expandedId, setExpandedId] = useState(generalFaqs[0]?.id ?? "");

  const faqItems = faqsByCategory[activeCategory].filter((item) => {
    if (!searchValue.trim()) {
      return true;
    }

    const query = searchValue.trim().toLowerCase();

    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

  const handleCategoryChange = (key: string) => {
    const category = key as HelpCategoryKey;
    const nextItems = faqsByCategory[category];

    setActiveCategory(category);
    setExpandedId(nextItems[0]?.id ?? "");
  };

  return (
    <CravyoSheetScreen
      activeNavKey="support"
      backHref="/support"
      subtitle="How can we help you?"
      title={title}
    >
      <CravyoPillTabs
        activeKey="faq"
        items={faqTopTabs}
        onChange={(key) => {
          if (key === "contact-us") {
            router.replace("/support/contact-us");
          }
        }}
      />

      <CravyoPillTabs
        activeKey={activeCategory}
        fill={false}
        items={faqCategories}
        onChange={handleCategoryChange}
        size="small"
        style={styles.categoryTabs}
      />

      <SearchField value={searchValue} onChangeText={setSearchValue} />

      <View style={styles.faqList}>
        {faqItems.length ? (
          faqItems.map((item) => (
            <FaqAccordionItem
              expanded={item.id === expandedId}
              item={item}
              key={item.id}
              onPress={() =>
                setExpandedId((current) => (current === item.id ? "" : item.id))
              }
            />
          ))
        ) : (
          <Text style={styles.emptyFaqText}>
            No matching help articles were found for your search.
          </Text>
        )}
      </View>
    </CravyoSheetScreen>
  );
}

function SearchField({
  onChangeText,
  value,
}: {
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <View style={styles.searchShell}>
      <Feather color="#C7B0A1" name="search" size={18} />
      <TextInput
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor="#C7B0A1"
        style={styles.searchInput}
        value={value}
      />
      <Pressable accessibilityRole="button" style={styles.searchFilterButton}>
        <Feather color="#FFFFFF" name="sliders" size={16} />
      </Pressable>
    </View>
  );
}

function FaqAccordionItem({
  expanded,
  item,
  onPress,
}: {
  expanded: boolean;
  item: FaqEntry;
  onPress: () => void;
}) {
  return (
    <View style={styles.faqItem}>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, expanded ? styles.faqQuestionExpanded : null]}>
          {item.question}
        </Text>
        <Feather color="#D98B57" name="chevron-down" size={18} />
      </Pressable>

      {expanded ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  helpDescription: {
    color: "#806B61",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  helpOptionList: {
    marginTop: 24,
    gap: 14,
  },
  helpOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 22,
    backgroundColor: "#FFF8F1",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  helpOptionIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
  },
  helpOptionCopy: {
    flex: 1,
  },
  helpOptionLabel: {
    color: "#2C2422",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  helpOptionText: {
    marginTop: 3,
    color: "#876F63",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  categoryTabs: {
    marginTop: 14,
  },
  searchShell: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 8,
    shadowColor: "#D19360",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    color: "#4B403B",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
  searchFilterButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#F07A38",
  },
  faqList: {
    marginTop: 18,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3E3D6",
    paddingVertical: 16,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    color: "#D0B29A",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  faqQuestionExpanded: {
    color: "#2C2422",
  },
  faqAnswer: {
    marginTop: 14,
    color: "#6B5E58",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  emptyFaqText: {
    color: "#8A756B",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  contactList: {
    marginTop: 18,
  },
  contactRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3E3D6",
    paddingVertical: 16,
  },
  contactRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  contactRowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  contactLabel: {
    color: "#2C2422",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700",
  },
  contactDetail: {
    marginTop: 12,
    marginLeft: 42,
    color: "#7A685F",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  supportGreetingBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#FEE4C9",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  supportGreetingText: {
    color: "#E27E39",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
  },
  supportMessageBubble: {
    marginTop: 14,
    borderRadius: 24,
    borderTopLeftRadius: 6,
    backgroundColor: "#FFF7EF",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  supportMessageText: {
    color: "#5F514B",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  supportChoicesList: {
    marginTop: 18,
    gap: 10,
  },
  supportChoice: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#D19360",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  supportChoiceLabel: {
    color: "#2C2422",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
  },
  supportOrderCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: "#FFF7EF",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  supportOrderBadge: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#F3B477",
  },
  supportOrderEyebrow: {
    marginTop: 14,
    color: "#DE8642",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
  },
  supportOrderTitle: {
    marginTop: 8,
    color: "#2C2422",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
  },
  supportOrderMeta: {
    marginTop: 4,
    color: "#7C675D",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
  },
  supportIssueChip: {
    alignSelf: "flex-start",
    marginTop: 16,
    borderRadius: 999,
    backgroundColor: "#FFE7D0",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  supportIssueLabel: {
    color: "#E27E39",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
  },
  supportInputShell: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  supportInputPlaceholder: {
    flex: 1,
    color: "#B69D8B",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "500",
  },
});
