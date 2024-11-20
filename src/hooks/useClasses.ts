import { useState, useCallback } from 'react';
import { Class, Section } from '../types';

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([
    { 
      id: 1, 
      name: 'Branch CSE', 
      sections: [
        { id: 1, name: 'CSE A' },
        { id: 2, name: 'CSE B' },
        { id: 3, name: 'CSE C' }, 
        { id: 4, name: 'CSE D' }
      ] 
    },
    { 
      id: 2, 
      name: 'Branch AIML', 
      sections: [
        { id: 5, name: 'AIML A' },
        { id: 6, name: 'AIML B' }
      ] 
    }
  ]);

  const addClass = useCallback((name: string) => {
    setClasses(prevClasses => {
      const newId = Math.max(...prevClasses.map(c => c.id), 0) + 1;
      return [...prevClasses, { id: newId, name: name.trim(), sections: [] }];
    });
  }, []);

  const updateClass = useCallback((updatedClass: Class) => {
    setClasses(prevClasses =>
      prevClasses.map(c => (c.id === updatedClass.id ? updatedClass : c))
    );
  }, []);

  const deleteClass = useCallback((classId: number) => {
    setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
  }, []);

  const addSection = useCallback((classId: number, sectionName: string) => {
    setClasses(prevClasses =>
      prevClasses.map(c => {
        if (c.id === classId) {
          const newSectionId = c.sections.length > 0 
            ? Math.max(...c.sections.map(s => s.id)) + 1 
            : 1;
          return {
            ...c,
            sections: [...c.sections, { id: newSectionId, name: sectionName.trim() }]
          };
        }
        return c;
      })
    );
  }, []);

  const updateSection = useCallback((classId: number, updatedSection: Section) => {
    setClasses(prevClasses =>
      prevClasses.map(c => {
        if (c.id === classId) {
          return {
            ...c,
            sections: c.sections.map(s =>
              s.id === updatedSection.id ? updatedSection : s
            )
          };
        }
        return c;
      })
    );
  }, []);

  const deleteSection = useCallback((classId: number, sectionId: number) => {
    setClasses(prevClasses =>
      prevClasses.map(c => {
        if (c.id === classId) {
          return {
            ...c,
            sections: c.sections.filter(s => s.id !== sectionId)
          };
        }
        return c;
      })
    );
  }, []);

  return {
    classes,
    addClass,
    updateClass,
    deleteClass,
    addSection,
    updateSection,
    deleteSection
  };
};
