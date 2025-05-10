import { useState } from 'react';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon. It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies. It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

const faqData = [
  {
    value: 'reset-password',
    question: 'How can I reset my password?',
    answer: placeholder,
  },
  {
    value: 'another-account',
    question: 'Can I create more than one account?',
    answer: placeholder,
  },
  {
    value: 'newsletter',
    question: 'How can I subscribe to the monthly newsletter?',
    answer: placeholder,
  },
  {
    value: 'credit-card',
    question: 'Do you store credit card information securely?',
    answer: placeholder,
  },
  {
    value: 'payment',
    question: 'What payment systems do you work with?',
    answer: placeholder,
  },
];

function FaqSimple() {
  const [opened, setOpened] = useState(null);

  const toggle = (val) => {
    setOpened(opened === val ? null : val);
  };

  return (
    <div className="min-h-[650px] py-10 px-4 sm:px-0 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqData.map((item) => (
          <div key={item.value} className="rounded-md overflow-hidden">
            <button onClick={() => toggle(item.value)} className="w-full text-left px-6 py-4 bg-white/10 font-medium text-white hover:text-white hover:bg-white/5 transition">{item.question}</button>
            {opened === item.value && (
              <div className="px-6 py-4 bg-white/5 text-sm text-white/40">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqSimple;