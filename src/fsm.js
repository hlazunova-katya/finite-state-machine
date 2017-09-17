class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error("Config needed");
        this.config = config;
        this.state = config.initial;
        this.logbook=[this.state];
        this.logbookI=0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
       if (!Object.keys(this.config.states).includes(state)) throw new Error("This state does't exist");
       this.state = state;
       if (this.logbook[this.logbook.length - 1] !== state) {
            this.logbook.push(state);
       }
       this.logbookI = this.logbook.length -1;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let transitions = this.config.states[this.state].transitions;
        if (!Object.keys(transitions).includes(event)) throw new Error ("This event does't exist in current state");
        this.changeState(transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.logbook.splice(0, this.logbook.length);
        this.logbookI = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let keys = [];
        if (!event) {
           return Object.keys(this.config.states);
        }
        else {
            for (let key in this.config.states) {
                if (this.config.states[key].transitions.hasOwnProperty(event))
                  keys.push(key);
            }
        }
        return keys;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
       if (this.logbook.length>1&&this.logbookI>0){
            this.logbookI--;
            this.state = this.logbook[this.logbookI];
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.logbook.length > 1 && this.logbookI < this.logbook.length - 1) {
            this.logbookI++;
            this.state = this.logbook[this.logbookI];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.logbook.splice(0, this.logbook.length);
        this.logbookI = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
