"use client";

import React, { useState, useEffect } from 'react';
import { useMastery } from '@/context/MasteryContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    question: "According to DepEd Order 003 s. 2026, which of the following is an explicitly supported use of AI for teachers?",
    options: [
      "Grading students based solely on AI evaluation",
      "Replacing direct interaction with Kindergarten learners",
      "Generating differentiated content and lesson materials",
      "Inputting student grades into public AI databases for analysis"
    ],
    answer: "Generating differentiated content and lesson materials"
  },
  {
    id: 2,
    question: "What is the mandatory rule regarding AI use for Kinder to Grade 3 learners?",
    options: [
      "AI is strictly prohibited for these grade levels.",
      "AI must only be used by the students themselves.",
      "AI use involving very young learners must be supervised and age-appropriate.",
      "AI can only be used for generating report card comments."
    ],
    answer: "AI use involving very young learners must be supervised and age-appropriate."
  },
  {
    id: 3,
    question: "When writing a prompt for an AI tool to generate a report card comment, which of the following inputs is considered SAFE under privacy guidelines?",
    options: [
      "Write a comment for Juan dela Cruz, LRN 123456, who got an 82 in Math.",
      "Write a comment for a Grade 5 student with ADHD who struggles with focus.",
      "Write a comment for a Grade 5 student who is strong in English but needs support in Math.",
      "Write a comment for Maria, who lives in Barangay San Jose and frequently misses class."
    ],
    answer: "Write a comment for a Grade 5 student who is strong in English but needs support in Math."
  },
  {
    id: 4,
    question: "Why is the 'MELC Alignment Trick' recommended when generating lesson plans?",
    options: [
      "Because AI has the entire DepEd database memorized.",
      "Because it automatically uploads your lesson to the DepEd portal.",
      "Because pasting the exact competency ensures the AI aligns its output to specific DepEd standards.",
      "Because it bypasses copyright restrictions on educational materials."
    ],
    answer: "Because pasting the exact competency ensures the AI aligns its output to specific DepEd standards."
  },
  {
    id: 5,
    question: "Which of the following best describes the role of AI in assessment design?",
    options: [
      "AI should generate the questions and assign the final grade.",
      "AI replaces the need for a teacher to review quiz questions.",
      "AI is excellent at generating the structure of assessments, but the teacher must review, refine, and make the final call.",
      "AI should only be used for multiple-choice questions, not rubrics."
    ],
    answer: "AI is excellent at generating the structure of assessments, but the teacher must review, refine, and make the final call."
  },
  {
    id: 6,
    question: "What is a recommended strategy to make assignments more 'AI-Resistant'?",
    options: [
      "Ban the use of computers entirely.",
      "Require personal experience, local context, or process documentation as evidence.",
      "Only assign multiple-choice quizzes.",
      "Give students less time to complete the assignment."
    ],
    answer: "Require personal experience, local context, or process documentation as evidence."
  },
  {
    id: 7,
    question: "When dealing with AI-generated text or reading passages, what is the most important step a Filipino teacher should take?",
    options: [
      "Localize the content to ensure cultural relevance (e.g., using a palengke instead of a generic grocery store).",
      "Use the text exactly as generated to maintain perfect grammar.",
      "Increase the reading level to challenge the students.",
      "Only use AI text for advanced learners."
    ],
    answer: "Localize the content to ensure cultural relevance (e.g., using a palengke instead of a generic grocery store)."
  },
  {
    id: 8,
    question: "What is the fundamental difference between AI as 'assistance' versus AI as 'replacement'?",
    options: [
      "The specific brand of the AI tool used.",
      "Whether the student is using a laptop or a mobile phone.",
      "Whether the student uses AI to help them think and refine their voice, versus copying output without critical thought.",
      "Whether the teacher gave permission to use the internet."
    ],
    answer: "Whether the student uses AI to help them think and refine their voice, versus copying output without critical thought."
  },
  {
    id: 9,
    question: "Why is MagicSchool AI highlighted as different from general-purpose tools like ChatGPT in an educational context?",
    options: [
      "It is the only AI tool that is completely free.",
      "It was built with student data protection as a core design principle and does not train its models on student data.",
      "It is the only tool officially mandated by DepEd.",
      "It writes better poetry than other tools."
    ],
    answer: "It was built with student data protection as a core design principle and does not train its models on student data."
  },
  {
    id: 10,
    question: "How should a teacher handle a situation where a student does not have access to AI tools at home?",
    options: [
      "Lower the student's grade for lack of participation.",
      "Require the student to purchase a device.",
      "Ensure AI-assisted tasks are done in school during class time so access is equitable.",
      "Ignore the disparity and assign the homework anyway."
    ],
    answer: "Ensure AI-assisted tasks are done in school during class time so access is equitable."
  },
  {
    id: 11,
    question: "What is the recommended approach for discussing AI use with students in Grades 4-6?",
    options: [
      "Tell them AI is a magical machine that knows everything.",
      "Explain that AI is a tool, similar to a calculator, meant to assist them.",
      "Threaten them with disciplinary action if they are caught using it.",
      "Avoid mentioning AI entirely."
    ],
    answer: "Explain that AI is a tool, similar to a calculator, meant to assist them."
  },
  {
    id: 12,
    question: "When a teacher suspects a student copied AI output without engaging with the material, what is the recommended 'Curiosity Before Accusation' approach?",
    options: [
      "Accuse the student of cheating immediately and give a failing grade.",
      "Run the text through an AI detector and use the percentage as definitive proof.",
      "Ask the student to explain their thinking and walk through how they developed their argument.",
      "Call the parents and report academic dishonesty."
    ],
    answer: "Ask the student to explain their thinking and walk through how they developed their argument."
  }
];

export default function QuizPage() {
  const { updateQuizScore } = useMastery();
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentIdx].id]: option });
  };

  const score = questions.filter(q => answers[q.id] === q.answer).length;

  useEffect(() => {
    if (showResults && user) {
      updateQuizScore(score);
    }
  }, [showResults, user, score, updateQuizScore]);

  return (
    <div className="bg-[#f9f9f8] min-h-screen text-[#1a1c1c] p-6 pt-32 pb-20 flex flex-col items-center">
      {!showResults ? (
        <div className="w-full max-w-5xl space-y-12">
            <div className="mb-12">
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-800/60">Module 01</span>
                <h1 className="text-3xl font-bold text-[#00464a] mt-1 font-serif">AI Ethics in the Classroom</h1>
                <div className="h-1.5 w-full bg-[#e8e8e7] rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-[#006064]" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-10 rounded-[24px] shadow-sm">
                        <h2 className="text-xl font-bold text-[#1a1c1c] leading-relaxed mb-10">
                            {questions[currentIdx].question}
                        </h2>
                        <div className="space-y-4">
                            {questions[currentIdx].options.map((opt) => (
                                <button 
                                    key={opt}
                                    onClick={() => handleSelect(opt)}
                                    className={`w-full text-left p-6 rounded-[12px] transition-all border-2 ${answers[questions[currentIdx].id] === opt ? 'border-[#00464a] bg-white' : 'border-transparent bg-[#f4f4f3] hover:bg-[#eeeeed]'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-between">
                        <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} className="font-bold text-[#00464a]">Previous</button>
                        {currentIdx < questions.length - 1 ? (
                            <button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-[#00464a] text-white px-10 py-3 rounded-[12px]">Next</button>
                        ) : (
                            <button onClick={() => setShowResults(true)} className="bg-[#744f00] text-white px-10 py-3 rounded-[12px]">Submit</button>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-[24px] border-l-4 border-[#744f00]">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#3f4949] mb-4">Coach Insight</h3>
                        <p className="text-sm text-[#1a1c1c] leading-relaxed">
                            Remember: AI is a partner in your pedagogical journey. The final judgment on student learning always resides with you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      ) : (
        <div className="text-center bg-white p-16 rounded-[24px] shadow-sm max-w-xl">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="material-symbols-outlined text-4xl text-primary">emoji_events</span>
            </div>
            <h1 className="text-4xl font-bold text-[#00464a] mb-4 font-headline">Quiz Complete!</h1>
            <p className="text-2xl mb-4 font-body">You scored {score} out of {questions.length}</p>
            <p className="text-on-surface-variant text-sm mb-10 font-body">
                {score === questions.length 
                  ? "Perfect! You've mastered the ethical foundations of AIgnite." 
                  : "Great effort. You can retry anytime to reach for a perfect score."}
            </p>
            <div className="flex flex-col gap-4">
                <Link href="/atelier" className="bg-[#00464a] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg">
                    Return to Atelier
                </Link>
                <button onClick={() => window.location.reload()} className="text-primary font-bold text-sm uppercase tracking-widest p-4">
                    Retry Quiz
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
