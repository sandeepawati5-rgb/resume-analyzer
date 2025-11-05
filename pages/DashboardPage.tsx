import React, { useState, useRef } from 'react';
import { DASHBOARD_RESUMES, RANDOM_IMPROVEMENT_TIPS, ALL_KEYWORDS } from '../constants';
import { ArrowRightIcon, SpinnerIcon } from '../components/IconComponents';
import { DashboardResume } from '../types';

const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
};

const getScoreRingColor = (score: number) => {
    if (score >= 90) return 'stroke-green-500';
    if (score >= 70) return 'stroke-yellow-500';
    return 'stroke-red-500';
};

const ScoreRing: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 18; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative h-16 w-16">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 40 40">
                <circle
                    className="stroke-current text-gray-200"
                    strokeWidth="4"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                />
                <circle
                    className={`stroke-current transition-all duration-1000 ease-in-out ${getScoreRingColor(score)}`}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
                {score}
            </span>
        </div>
    );
};


const DashboardPage: React.FC = () => {
    const [resumes, setResumes] = useState<DashboardResume[]>(DASHBOARD_RESUMES);
    const [selectedResume, setSelectedResume] = useState<DashboardResume | null>(resumes[0] || null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getRandomItems = <T,>(arr: T[], count: number): T[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleAnalyzeNewResumeClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);

        setTimeout(() => {
            const newResume: DashboardResume = {
                id: Date.now(),
                name: file.name,
                score: Math.floor(Math.random() * (95 - 65 + 1)) + 65,
                keywordsFound: getRandomItems(ALL_KEYWORDS, 5),
                improvementTips: RANDOM_IMPROVEMENT_TIPS[Math.floor(Math.random() * RANDOM_IMPROVEMENT_TIPS.length)],
                lastUpdated: 'Just now',
            };

            setResumes(prevResumes => [newResume, ...prevResumes]);
            setSelectedResume(newResume);
            setIsAnalyzing(false);
            
            if(fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        }, 2500);
    };

    return (
        <div className="bg-gray-50 min-h-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
            />
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Resume Dashboard</h1>
                        <p className="mt-2 text-gray-600">Review your analyzed resumes and track your improvements.</p>
                    </div>
                    <button
                        onClick={handleAnalyzeNewResumeClick}
                        disabled={isAnalyzing}
                        className="mt-4 md:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <>
                                <SpinnerIcon className="w-5 h-5 mr-2" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                Analyze New Resume
                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Resume List */}
                    <div className="lg:w-1/3">
                         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                           <ul className="divide-y divide-gray-200">
                            {resumes.map((resume) => (
                                <li key={resume.id} onClick={() => setSelectedResume(resume)}
                                    className={`p-4 cursor-pointer transition-colors ${selectedResume?.id === resume.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className={`font-semibold ${selectedResume?.id === resume.id ? 'text-blue-700' : 'text-gray-800'}`}>{resume.name}</p>
                                            <p className="text-sm text-gray-500">Last updated: {resume.lastUpdated}</p>
                                        </div>
                                        <div className={`text-lg font-bold px-3 py-1 text-sm rounded-full ${getScoreColor(resume.score)}`}>
                                            {resume.score}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Selected Resume Details */}
                    <div className="lg:w-2/3">
                        {selectedResume ? (
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 break-all">{selectedResume.name}</h2>
                                        <p className="text-gray-500">Overall ATS Score</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                      <ScoreRing score={selectedResume.score} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">Improvement Tips</h3>
                                        <p className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">{selectedResume.improvementTips}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">Keywords Found</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedResume.keywordsFound.map(keyword => (
                                                <span key={keyword} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                                <p className="text-gray-600 text-lg">You haven't analyzed any resumes yet.</p>
                                <button onClick={handleAnalyzeNewResumeClick} className="mt-4 text-blue-600 font-semibold hover:underline">
                                    Analyze your first resume now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;